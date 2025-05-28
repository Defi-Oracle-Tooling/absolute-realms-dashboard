#!/usr/bin/env bash
set -euo pipefail
echo "[INFO] GitHub CLI setup"
if ! command -v gh > /dev/null; then
  echo "[INFO] Installing GitHub CLI"
  brew update && brew install gh
fi
gh auth login
