#!/usr/bin/env bash
set -euo pipefail
echo "[INFO] AWS CLI setup"
if ! command -v aws > /dev/null; then
  echo "[INFO] Installing AWS CLI"
  brew update && brew install awscli
fi
aws configure
