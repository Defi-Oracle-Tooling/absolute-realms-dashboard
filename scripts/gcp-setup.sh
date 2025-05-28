#!/usr/bin/env bash
set -euo pipefail
echo "[INFO] Google Cloud SDK setup"
if ! command -v gcloud > /dev/null; then
  echo "[INFO] Installing Google Cloud SDK"
  brew update && brew install --cask google-cloud-sdk
fi
gcloud init
