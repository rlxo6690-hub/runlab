# RunLab 운영 이미지 — 파이썬 + 필요한 프로그램(글자인식·PPT변환·영상) 전부 포함.
FROM python:3.12-slim

# 시스템 프로그램: OCR(tesseract, 한국어), PPT→PDF(LibreOffice), 영상(ffmpeg), 한글 폰트
RUN apt-get update && apt-get install -y --no-install-recommends \
        tesseract-ocr tesseract-ocr-kor \
        libreoffice-impress libreoffice-core \
        ffmpeg \
        fonts-nanum fonts-noto-cjk \
        fontconfig curl \
    && fc-cache -f \
    && rm -rf /var/lib/apt/lists/*

ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1

WORKDIR /app
COPY backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# 소스 전체(backend/ + site/ + redesign/)
COPY . /app

WORKDIR /app/backend

# 정적파일 수집(관리자 CSS/JS) — 빌드 타임에 더미 키로 collectstatic만
RUN DEBUG=1 python manage.py collectstatic --noinput

EXPOSE 8000
# 시작: 마이그레이션 → factory 시딩 → gunicorn
# 2GB 서버 최적화: 워커 2개(WEB_CONCURRENCY로 조절), --max-requests로 워커 주기적 재활용
# (머신러닝 라이브러리가 남긴 메모리를 풀어줘 메모리 누수 방지). timeout 900(PPT·유튜브 대비).
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py seed_factory && python manage.py seed_prompts && exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers ${WEB_CONCURRENCY:-2} --timeout 900 --max-requests 200 --max-requests-jitter 50 --access-logfile - --error-logfile -"]
