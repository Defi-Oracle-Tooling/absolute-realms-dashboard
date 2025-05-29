# Architecture

## Overview

Absolute Realms Dashboard is a full-stack web application for managing and visualizing tasks. It uses:

- **Frontend**: Vanilla JS, Vite, MSAL.js, Firebase JS SDK
- **Backend**: Node.js, Express, Firestore (via Firebase Admin), OpenAI API
- **Authentication**: Azure AD (MSAL)
- **AI**: OpenAI GPT for task generation
- **CI/CD**: GitHub Actions, Docker, Azure Static Web Apps

## Diagram

```
[User] <-> [Frontend (Vite, JS, MSAL, Firebase)] <-> [Express API] <-> [Firestore, OpenAI]
```

## Key Components

- **api/**: Express server, endpoints, authentication, OpenAI integration
- **src/scripts/**: Frontend logic for auth, Firestore, UI, AI
- **config/**: Environment, MSAL, Firebase config
- **tests/**, **e2e/**: Unit/integration and E2E tests
- **docs/**: Documentation

## Data Flow

1. User signs in with Azure AD (MSAL)
2. User interacts with tasks (CRUD via Firestore)
3. User can generate tasks using OpenAI (backend API)
4. All data is synced and rendered in the UI
