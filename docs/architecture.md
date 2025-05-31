# Architecture

## Overview

Absolute Realms Dashboard is a full-stack web application for managing and visualizing tasks. It uses:

- **Frontend**: Vanilla JS, Vite, MSAL.js, Firebase JS SDK
- **Backend**: Node.js, Express, Azure Cosmos DB, Azure AI Foundry
- **Authentication**: Azure AD (MSAL)
- **AI**: Azure AI Foundry for task generation
- **CI/CD**: GitHub Actions, Docker, Azure Static Web Apps

## Diagram

```
[User] <-> [Frontend (Vite, JS, MSAL)] <-> [Express API] <-> [Azure Cosmos DB, Azure AI Foundry]
```

## Key Components

- **api/**: Express server, endpoints, authentication, OpenAI integration
- **src/scripts/**: Frontend logic for auth, Firestore, UI, AI
- **config/**: Environment, MSAL, Firebase config
- **tests/**, **e2e/**: Unit/integration and E2E tests
- **docs/**: Documentation

## Data Flow

1. User signs in with Azure AD (MSAL)
2. User interacts with tasks (CRUD via Azure Cosmos DB)
3. User can generate tasks using Azure AI Foundry (backend API)
4. All data is synced and rendered in the UI
