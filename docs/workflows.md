# Workflows

## Development

- Clone repo, copy `.env.example` to `.env`, fill in credentials
- Run `./scripts/setup-project.sh` to scaffold
- Install dependencies: `pnpm install`
- Start dev server: `pnpm start`
- Lint/format: `pnpm lint`, `pnpm format`
- Pre-commit hooks via Husky

## Testing

- Unit/integration: `pnpm test` (Vitest)
- E2E: `pnpm e2e` (Cypress)
- All tests run in CI (GitHub Actions)

## Deployment

- Build: `pnpm build`
- Docker: `docker-compose up` or deploy to Azure Static Web Apps
- CI/CD: On push/PR, GitHub Actions runs lint, test, build, E2E
