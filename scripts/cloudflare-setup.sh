#!/usr/bin/env bash
set -euo pipefail
echo "[INFO] Cloudflare Wrangler setup"
if ! command -v wrangler > /dev/null; then
  echo "[INFO] Installing Wrangler CLI"
  npm install -g wrangler
fi
wrangler login
