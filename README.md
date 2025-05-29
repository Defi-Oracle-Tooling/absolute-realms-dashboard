# Absolute Realms Dashboard

A dashboard for managing and visualizing tasks in Absolute Realms.
Uses Firebase for backend, Azure AD for auth, and OpenAI for AI generation.

## Setup

1. Copy `.env.example` to `.env` and fill in your credentials.
2. Run `./scripts/setup-project.sh` to scaffold and initialize.
3. Install dependencies: `pnpm install`.
4. Start dev server: `pnpm start` or `docker-compose up`.

## Environment Variables

The following environment variables are required (see `.env.example`):

**Firebase**

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

**Azure AD / MSAL**

- `MSAL_CLIENT_ID`
- `MSAL_AUTHORITY`
- `API_SCOPE` (e.g., `api://<client-id>/.default`)
- `REDIRECT_URI` (e.g., `http://localhost:3000`)

**OpenAI**

- `OPENAI_API_KEY`

**Server**

- `PORT` (default: 3000)

See `.env.example` for a template. All variables must be set for the backend and frontend to function correctly.

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

- `api/` - Express backend, endpoints, auth, OpenAI
- `src/scripts/` - Frontend JS (auth, Firestore, UI, AI)
- `config/` - Config files for env, Firebase, MSAL
- `tests/` - Vitest unit/integration tests
- `e2e/` - Cypress E2E tests
- `docs/` - Documentation

See `docs/architecture.md` and `docs/workflows.md` for more details.
