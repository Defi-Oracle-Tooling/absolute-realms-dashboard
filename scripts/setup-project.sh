#!/usr/bin/env bash

set -euo pipefail

# Logging helpers
log() { echo "[INFO] $*"; }
err() { echo "[ERROR] $*" >&2; exit 1; }

# Determine script and project directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

log "Creating project scaffold in $PROJECT_ROOT"

mkdir -p public src/{styles,scripts} api config utils docs tests e2e
log "Directory structure created"

# Public
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Absolute Realms Dashboard</title>
  <link rel="stylesheet" href="./src/styles/main.css" />
</head>
<body>
  <div id="app"></div>
  <script src="./src/scripts/mermaid-loader.js"></script>
  <script src="./src/scripts/msal-init.js"></script>
  <script src="./src/scripts/firestore-tasks.js"></script>
  <script src="./src/scripts/task-sidebar.js"></script>
  <script src="./src/scripts/ai-generator.js"></script>
</body>
</html>
EOF
log "Created public/index.html"
touch public/favicon.ico
log "Created placeholder public/favicon.ico"

# Styles
touch src/styles/main.css

# Scripts
touch src/scripts/{mermaid-loader.js,msal-init.js,firestore-tasks.js,task-sidebar.js,ai-generator.js}

# API backend
touch api/{server.js,auth.js,generate-task.js,update-task.js,task-service.js,openai-client.js}

# Config
cat > config/firebase-config.js << 'EOF'
// Firebase configuration stub
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};
EOF
cat > config/msal-config.js << 'EOF'
// MSAL (Azure AD) configuration stub
export const msalConfig = {
  auth: {
    clientId: process.env.MSAL_CLIENT_ID,
    authority: process.env.MSAL_AUTHORITY,
    redirectUri: window.location.origin
  }
};
EOF
cat > config/env-loader.js << 'EOF'
// dotenv loader
import dotenv from 'dotenv';
dotenv.config();
EOF
log "Created config files"

# Utils
touch utils/date-utils.js

# Docs
touch docs/{architecture.md,endpoints.md,workflows.md}

# Tests
touch tests/{api.test.js,auth.test.js,openai.test.js}

# E2E
touch e2e/dashboard.spec.cy.js

# Root files
cat > .env << 'EOF'
# Environment variables
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
MSAL_CLIENT_ID=
MSAL_AUTHORITY=
EOF
cp .env .env.example
log "Created .env and .env.example"
cat > firebase.json << 'EOF'
{
  "hosting": {
    "public": "public",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
EOF
cat > staticwebapp.config.json << 'EOF'
{
  "routes": [
    { "route": "/api/*", "allowedRoles": ["anonymous"] },
    { "route": "/", "serve": "/index.html" }
  ]
}
EOF
cat > Dockerfile << 'EOF'
FROM node:18-alpine as build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build

FROM nginx:stable-alpine
COPY --from=build /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
EOF
cat > README.md << 'EOF'
# Absolute Realms Dashboard

A dashboard for managing and visualizing tasks in Absolute Realms.
Uses Firebase for backend, Azure AD for auth, and OpenAI for AI generation.

## Setup

1. Copy `.env` and fill in your credentials.
2. Run `./scripts/setup-project.sh` to scaffold and initialize.
3. Install dependencies: `pnpm install`.
4. Start dev server: `pnpm start` or `docker-compose up`.
EOF
log "Generated .env, firebase.json, staticwebapp.config.json, Dockerfile, docker-compose.yml, README.md"
# Initialize pnpm package manager
if ! command -v pnpm > /dev/null 2>&1; then
  err "pnpm not found. Install via: npm install -g pnpm"
fi
# Initialize package.json manually (pnpm init flags vary by version)
PROJECT_NAME="$(basename "$PROJECT_ROOT")"
cat > package.json << 'EOF'
{
  "name": "${PROJECT_NAME}",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "lint": "eslint . --ext .js",
    "format": "prettier --write .",
    "test": "vitest",
    "e2e": "cypress run"
  }
}
EOF
log "Created package.json for $PROJECT_NAME"
 
# Install and configure linting and formatting tools
log "Installing dev dependencies: ESLint, Prettier, Vitest, Cypress"
pnpm add -D eslint prettier eslint-config-prettier eslint-plugin-prettier vitest vite cypress
log "Installed dev dependencies"
 
# Create ESLint config
cat > .eslintrc.json << 'EOF'
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended", "prettier"],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {}
}
EOF
 
# Create Prettier config
cat > .prettierrc << 'EOF'
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "semi": true
}
EOF
 
# EditorConfig
cat > .editorconfig << 'EOF'
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
EOF
 
# Git ignore
cat > .gitignore << 'EOF'
node_modules/
dist/
pnpm-lock.yaml
.env
.vscode/
EOF
 
# GitHub Actions workflow
mkdir -p .github/workflows
cat > .github/workflows/ci.yml << 'EOF'
name: Node.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: pnpm
      - name: Install dependencies
        run: pnpm install
      - name: Lint code
        run: pnpm lint
      - name: Run tests
        run: pnpm test
      - name: Run E2E tests
        if: success()
        run: pnpm e2e
EOF
 
# VS Code settings
mkdir -p .vscode
cat > .vscode/settings.json << 'EOF'
{
  "editor.formatOnSave": true,
  "files.exclude": {
    "node_modules": true,
    "dist": true
  },
  "eslint.packageManager": "pnpm"
}
EOF
 
cat > .vscode/extensions.json << 'EOF'
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "mhutchie.git-graph"
  ]
}
EOF

echo "✅ Project scaffold created in $PROJECT_ROOT"

## Initialize Git repository and first push
if [ ! -d .git ]; then
  log "Initializing Git repository"
  git init
  git branch -M main
fi
if ! git remote | grep -q origin; then
  log "Adding remote origin"
  git remote add origin https://github.com/Defi-Oracle-Tooling/absolute-realms-dashboard.git
fi
# Update README and commit
if ! grep -q '^# absolute-realms-dashboard' README.md; then
  echo "# absolute-realms-dashboard" >> README.md
  git add README.md
  git commit -m "first commit"
fi
log "Pushing to origin/main"
git push -u origin main

# Generate helper scripts for cloud & GitHub CLIs
log "Generating connection setup scripts"
mkdir -p scripts
cat > scripts/azure-setup.sh << 'EOF'
#!/usr/bin/env bash
set -euo pipefail
echo "[INFO] Azure CLI setup"
if ! command -v az > /dev/null; then
  echo "[INFO] Installing Azure CLI"
  brew update && brew install azure-cli
fi
az login
EOF
cat > scripts/aws-setup.sh << 'EOF'
#!/usr/bin/env bash
set -euo pipefail
echo "[INFO] AWS CLI setup"
if ! command -v aws > /dev/null; then
  echo "[INFO] Installing AWS CLI"
  brew update && brew install awscli
fi
aws configure
EOF
cat > scripts/gcp-setup.sh << 'EOF'
#!/usr/bin/env bash
set -euo pipefail
echo "[INFO] Google Cloud SDK setup"
if ! command -v gcloud > /dev/null; then
  echo "[INFO] Installing Google Cloud SDK"
  brew update && brew install --cask google-cloud-sdk
fi
gcloud init
EOF
cat > scripts/cloudflare-setup.sh << 'EOF'
#!/usr/bin/env bash
set -euo pipefail
echo "[INFO] Cloudflare Wrangler setup"
if ! command -v wrangler > /dev/null; then
  echo "[INFO] Installing Wrangler CLI"
  npm install -g wrangler
fi
wrangler login
EOF
cat > scripts/github-setup.sh << 'EOF'
#!/usr/bin/env bash
set -euo pipefail
echo "[INFO] GitHub CLI setup"
if ! command -v gh > /dev/null; then
  echo "[INFO] Installing GitHub CLI"
  brew update && brew install gh
fi
gh auth login
EOF
chmod +x scripts/*.sh
log "Generated connection setup scripts in scripts/"
