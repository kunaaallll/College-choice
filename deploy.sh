#!/usr/bin/env bash
# College Choice — Hostinger VPS deploy script
# Run once on a fresh Ubuntu 22/24 VPS as root (or sudo user).
# Usage: bash deploy.sh

set -euo pipefail

REPO="https://github.com/kunaaallll/College-choice"
APP_DIR="/opt/collegechoice"
DOMAIN="collegechoice.in"

echo "==> [1/7] Installing Docker..."
apt-get update -qq
apt-get install -y -qq ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | tee /etc/apt/sources.list.d/docker.list
apt-get update -qq
apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-compose-plugin
systemctl enable --now docker

echo "==> [2/7] Installing Nginx + Certbot..."
apt-get install -y -qq nginx certbot python3-certbot-nginx

echo "==> [3/7] Cloning / updating repo..."
if [ -d "$APP_DIR/.git" ]; then
  git -C "$APP_DIR" pull
else
  git clone "$REPO" "$APP_DIR"
fi

echo "==> [4/7] Creating .env (edit this before continuing)..."
if [ ! -f "$APP_DIR/.env" ]; then
  cat > "$APP_DIR/.env" <<EOF
# Neon connection string — copy from your Neon dashboard
DATABASE_URL=postgresql://neondb_owner:<password>@<host>.neon.tech/neondb?sslmode=require

# Generate with: openssl rand -hex 32
JWT_SECRET=$(openssl rand -hex 32)

CORS_ORIGIN=https://$DOMAIN
NEXT_PUBLIC_API_URL=https://$DOMAIN

# Optional — for re-running enrichment on the server
GROQ_API_KEY=
EOF
  echo ""
  echo "*** Edit $APP_DIR/.env and set DATABASE_URL, then re-run this script ***"
  echo ""
fi

# Stop here if DATABASE_URL is still the placeholder
if grep -q '<password>' "$APP_DIR/.env"; then
  echo "DATABASE_URL not set. Edit $APP_DIR/.env first."
  exit 1
fi

echo "==> [5/7] Building & starting containers..."
cd "$APP_DIR"
docker compose -f docker-compose.prod.yml up -d --build

echo "==> [6/7] Configuring Nginx..."
cp "$APP_DIR/nginx/collegechoice.conf" /etc/nginx/sites-available/collegechoice.in
ln -sf /etc/nginx/sites-available/collegechoice.in /etc/nginx/sites-enabled/collegechoice.in
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "==> [7/7] Obtaining SSL certificate..."
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos \
  --email kunalkr210@gmail.com --redirect

echo ""
echo "✅  College Choice is live at https://$DOMAIN"
