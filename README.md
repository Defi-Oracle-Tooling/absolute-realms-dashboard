# Absolute Realms Dashboard

A dashboard for managing and visualizing tasks in Absolute Realms.
Uses Azure Cosmos DB for backend, Azure AD for auth, and Azure AI Foundry for AI generation.

## Setup

1. Copy `.env.example` to `.env` and fill in your credentials.
2. Run `./scripts/setup-project.sh` to scaffold and initialize.
3. Install dependencies: `pnpm install`.
4. Start dev server: `pnpm start` or `docker-compose up`.

## Environment Variables

The following environment variables are required (see `.env.example`):

**Azure Cosmos DB**

- `AZURE_COSMOS_ENDPOINT`
- `AZURE_COSMOS_KEY`
- `AZURE_COSMOS_DATABASE_ID`
- `AZURE_COSMOS_CONTAINER_ID`

**Azure AD / MSAL**

- `MSAL_CLIENT_ID`
- `MSAL_AUTHORITY`
- `API_SCOPE` (e.g., `api://<client-id>/.default`)
- `REDIRECT_URI` (e.g., `http://localhost:3000`)

**Azure AI Foundry**

- `AZURE_AI_FOUNDRY_ENDPOINT`
- `AZURE_AI_FOUNDRY_KEY`
- `AZURE_AI_FOUNDRY_DEPLOYMENT_NAME`

**Server**

- `PORT` (default: 3000)

See `.env.example` for a template. All variables must be set for the backend and frontend to function correctly. Firebase and OpenAI variables are no longer required.

# absolute-realms-dashboard

## Contributing

1. Fork and clone the repo
2. Copy `.env.example` to `.env` and fill in all required variables
3. Run `./scripts/setup-project.sh` if needed
4. Install dependencies: `pnpm install`
5. Use `pnpm lint` and `pnpm format` before committing
6. All commits are checked by Husky pre-commit hooks
7. Run tests: `pnpm test` (unit/integration), `pnpm e2e` (E2E)
8. Build: `pnpm build` (Vite)
9. Start: `pnpm start` or `docker-compose up`

## Project Structure

- `api/` - Express backend, endpoints, auth, Azure AI Foundry, Azure Cosmos DB
- `src/scripts/` - Frontend JS (auth, Firestore, UI, AI)
- `config/` - Config files for env, Firebase, MSAL
- `tests/` - Vitest unit/integration tests
- `e2e/` - Cypress E2E tests
- `docs/` - Documentation

See `docs/architecture.md` and `docs/workflows.md` for more details.
