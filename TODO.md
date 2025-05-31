# TODO: Absolute Realms Dashboard

## Priority 1: Core Server & API

- [x] Implement `api/server.js` with Express setup, environment loading, and routing middleware.
- [ ] Develop `api/auth.js` to handle MSAL authentication and JWT validation.
- [ ] Build `api/openai-client.js` wrapper around OpenAI SDK with retries and error handling.
- [ ] Create `api/generate-task.js` endpoint to generate and store tasks using OpenAI and Firestore.
- [ ] Create `api/update-task.js` endpoint to update existing tasks in Firestore.
- [ ] Refactor `api/task-service.js` to provide clear CRUD methods for Firestore operations.

## Priority 2: Configuration & Environment

- [ ] Ensure `.env.example` covers all environment variables and document usage in README.
- [ ] Wire up Firebase initialization in backend using `config/firebase-config.js`.
- [ ] Validate MSAL configuration in `config/msal-config.js` for both client and server.

## Priority 3: Frontend Features

- [ ] Implement Azure AD sign-in flow in `src/scripts/msal-init.js` and manage tokens.
- [ ] Develop Firestore integration in `src/scripts/firestore-tasks.js` to list and manage tasks.
- [ ] Create UI sidebar in `src/scripts/task-sidebar.js` for task navigation and details.
- [ ] Add AI task generation in `src/scripts/ai-generator.js`, connecting to backend API.
- [ ] Style components using `src/styles/main.css` and finalize `public/index.html` layout.

## Priority 4: Testing & Quality

- [ ] Write Vitest unit tests for backend routes in `tests/*.test.js`.
- [ ] Add integration tests for Firestore in API endpoints.
- [ ] Develop Cypress E2E tests in `e2e/dashboard.spec.cy.js` covering login, CRUD, and AI flows.
- [ ] Set up Husky pre-commit hooks for linting and formatting.

## Priority 5: Documentation

- [ ] Populate `docs/architecture.md` with system design diagrams and narrative.
- [ ] Document all API endpoints and schemas in `docs/endpoints.md`.
- [ ] Describe development, testing, and deployment workflows in `docs/workflows.md`.
- [ ] Enhance `README.md` with setup, build, test, and contribution instructions.

## Priority 6: CI/CD & Deployment

- [ ] Add `build` and `start` scripts (`pnpm build`, `pnpm start`) and configure bundler (e.g., Vite).
- [ ] Extend CI (`.github/workflows/ci.yml`) to include build, lint, unit tests, and E2E tests.
- [ ] Configure Docker multi-stage build with test and production stages.
- [ ] Add deployment step for Azure Static Web Apps or GitHub Pages.
