#!/usr/bin/env bash
set -euo pipefail
echo "[INFO] Azure CLI setup"
if ! command -v az > /dev/null; then
  echo "[INFO] Installing Azure CLI"
  brew update && brew install azure-cli
fi
az login
