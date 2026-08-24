"""텍스트 마이닝 — /sim/api/text_proxy.php.

계약: docs/inventory/text-timeseries-contract.md (JOB1).
형태소분석기: 원본은 KoNLPy Okt/Kkma(둘 다 JVM 필요)였으나, 혼자 운영 서버의 배포 편의를 위해
kiwipiepy(순수 pip, Java 불필요)로 통일한다. 두 옵션(okt/kkma)은 같은 엔진을 쓰게 되지만
품사 분석 품질은 교육용으로 충분하다. (Python 통합 결정과 일관 — Java 런타임 회피)
응답: {stats, word_freq[[w,c]], pos_distribution{}, tfidf?[{word,score}], bigrams?[[w,c]], wordcloud_b64?}.
"""
import io
import base64
from collections import Counter
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

_kiwi = None


def _tokenizer():
    global _kiwi
    if _kiwi is None:
        from kiwipiepy import Kiwi
        _kiwi = Kiwi()
    return _kiwi


# kiwipiepy 품사 태그 → 한국어 라벨 (도넛 범례용) + pos_filter 그룹
_POS_LABEL = {"NNG": "일반명사", "NNP": "고유명사", "NNB": "의존명사",
              "VV": "동사", "VA": "형용사", "MAG": "부사", "MM": "관형사",
              "NR": "수사", "NP": "대명사", "XR": "어근", "SL": "외국어",
              "VX": "보조용언", "VCP": "지정사", "VCN": "부정지정사",
              "XSV": "동사파생", "XSA": "형용사파생", "XSN": "명사파생",
              "IC": "감탄사", "SN": "숫자", "SH": "한자"}


def _label(tag):
    return _POS_LABEL.get(tag, "기타")
_NOUN = {"NNG", "NNP", "NNB", "NR", "NP"}
_ADJ = {"VA"}
_VERB = {"VV"}


def _allowed_tags(pos_filter):
    if pos_filter == "noun":
        return _NOUN
    if pos_filter == "noun_adj":
        return _NOUN | _ADJ
    if pos_filter == "noun_verb":
        return _NOUN | _VERB
    return None  # all — 조사·어미(J*·E*)·기호(S*) 제외는 아래에서


def _tokenize(text, pos_filter, min_len, stops):
    kiwi = _tokenizer()
    allowed = _allowed_tags(pos_filter)
    words, pos_counter = [], Counter()
    for tok in kiwi.tokenize(text):
        tag = tok.tag
        if tag[0] in ("J", "E", "S", "W") or tag.startswith("SF"):  # 조사·어미·기호·URL 제외
            continue
        if allowed is not None and tag not in allowed:
            # pos_distribution엔 넣되 word 목록엔 안 넣음
            pos_counter[_label(tag)] += 1
            continue
        form = tok.form
        if len(form) < min_len or form in stops:
            continue
        words.append(form)
        pos_counter[_label(tag)] += 1
    return words, pos_counter


@csrf_exempt
def text_proxy(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"})
    g = request.POST.get
    text = g("text", "")
    if not text.strip():
        return JsonResponse({"error": "분석할 텍스트가 없습니다"})
    docs = [d for d in text.split("\n") if d.strip()]
    pos_filter = g("pos_filter", "noun")
    min_len = int(g("min_len") or 2)
    max_words = int(g("max_words") or 50)
    stops = {s.strip() for s in (g("user_stops", "") or "").split(",") if s.strip()}

    per_doc_tokens, all_words, pos_counter = [], [], Counter()
    for d in docs:
        w, pc = _tokenize(d, pos_filter, min_len, stops)
        per_doc_tokens.append(w)
        all_words.extend(w)
        pos_counter.update(pc)

    freq = Counter(all_words).most_common(max_words)
    total_chars = sum(len(d) for d in docs)
    stats = {"n_docs": len(docs), "total_tokens": len(all_words),
             "unique_words": len(set(all_words)),
             "avg_chars": round(total_chars / max(len(docs), 1), 1),
             "total_chars": total_chars}
    out = {"stats": stats, "word_freq": [[w, c] for w, c in freq],
           "pos_distribution": dict(pos_counter.most_common())}

    if g("include_tfidf") == "true" and len(docs) >= 2:
        out["tfidf"] = _tfidf(per_doc_tokens, max_words)
    if g("include_ngram") == "true":
        out["bigrams"] = _bigrams(per_doc_tokens, max_words)
    if g("include_wordcloud") == "true" and freq:
        out["wordcloud_b64"] = _wordcloud(dict(freq), g("wordcloud_bg", "#0a0e17"),
                                          g("wordcloud_shape", "square"))
    return JsonResponse(out)


def _tfidf(per_doc_tokens, top):
    docs = [" ".join(w) for w in per_doc_tokens]
    from sklearn.feature_extraction.text import TfidfVectorizer
    try:
        vec = TfidfVectorizer(token_pattern=r"(?u)\S+")
        m = vec.fit_transform(docs)
    except ValueError:
        return []
    import numpy as np
    scores = np.asarray(m.mean(axis=0)).ravel()
    terms = vec.get_feature_names_out()
    order = scores.argsort()[::-1][:top]
    return [{"word": terms[i], "score": round(float(scores[i]), 4)} for i in order]


def _bigrams(per_doc_tokens, top):
    c = Counter()
    for w in per_doc_tokens:
        for a, b in zip(w, w[1:]):
            c[f"{a} {b}"] += 1
    return [[bg, n] for bg, n in c.most_common(top)]


def _wordcloud(freq, bg, shape):
    import numpy as np
    from wordcloud import WordCloud
    mask = None
    if shape in ("circle", "heart"):
        size = 500
        y, x = np.ogrid[:size, :size]
        if shape == "circle":
            m = (x - size / 2) ** 2 + (y - size / 2) ** 2 > (size / 2) ** 2
        else:  # heart
            xx = (x - size / 2) / (size / 2); yy = -(y - size / 2) / (size / 2)
            m = ((xx ** 2 + yy ** 2 - 1) ** 3 - xx ** 2 * yy ** 3) > 0
        mask = np.where(m, 255, 0).astype("uint8")
    font = _korean_font()
    wc = WordCloud(width=500, height=500, background_color=bg, mask=mask,
                   font_path=font, prefer_horizontal=0.9, max_words=200)
    wc.generate_from_frequencies(freq)
    buf = io.BytesIO()
    wc.to_image().save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode()


def _korean_font():
    import os
    for p in ("/System/Library/Fonts/AppleSDGothicNeo.ttc",
              "/System/Library/Fonts/Supplemental/AppleGothic.ttf",
              "/usr/share/fonts/truetype/nanum/NanumGothic.ttf"):
        if os.path.exists(p):
            return p
    return None
