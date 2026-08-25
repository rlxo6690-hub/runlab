#!/usr/bin/env bash
# RunLab 원클릭 설치 — 스왑 + 도커 + .env 생성 + 빌드/실행.
# 사용: cd runlab && bash deploy/setup.sh
set -e

echo "==== [1/4] 스왑 메모리 4GB 설정 ===="
if [ ! -f /swapfile ]; then
  fallocate -l 4G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  echo "스왑 설정 완료"
else
  echo "이미 스왑 있음, 건너뜀"
fi

echo "==== [2/4] 도커 설치 ===="
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
else
  echo "이미 도커 있음, 건너뜀"
fi

echo "==== [3/4] 설정파일(.env) 생성 ===="
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
if [ ! -f .env ]; then
  SECRET=$(openssl rand -base64 48 | tr -dc 'A-Za-z0-9' | cut -c1-50)
  ADMINPW=$(openssl rand -base64 12 | tr -dc 'A-Za-z0-9' | cut -c1-12)
  {
    echo "SITE_DOMAIN=runlab.kr"
    echo "ALLOWED_HOSTS=runlab.kr www.runlab.kr"
    echo "DEBUG=0"
    echo "SECRET_KEY=$SECRET"
    echo "DB_PATH=/app/backend/data/db.sqlite3"
    echo "ADMIN_PASSWORD=$ADMINPW"
    echo "DEMO_PASSWORD=runlab2026"
  } > .env
  echo ""
  echo "*********************************************************"
  echo "  관리자 비밀번호(ADMIN_PASSWORD): $ADMINPW"
  echo "  ↑ 꼭 메모하세요! (https://runlab.kr/admin/ 로그인용)"
  echo "  데모 비밀번호(DEMO_PASSWORD): runlab2026"
  echo "*********************************************************"
  echo ""
else
  echo ".env 이미 있음, 건너뜀"
fi

echo "==== [4/4] RunLab 빌드 및 실행 (5~20분 소요) ===="
docker compose up -d --build

echo ""
echo "==== 완료! ===="
echo "1~2분 뒤 https://runlab.kr 접속하세요 (HTTPS 인증서 자동 발급)."
echo "상태 확인: docker compose ps"
echo "로그 보기: docker compose logs -f app"
