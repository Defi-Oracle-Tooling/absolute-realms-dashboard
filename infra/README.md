# Azure Infrastructure for Absolute Realms Dashboard

This folder contains Bicep files and parameters for deploying the Absolute Realms Dashboard backend and its dependencies on Azure using Azure Developer CLI (azd).

## Resources Deployed

- Azure App Service (for backend API)
- Azure Cosmos DB (NoSQL)
- Azure AI Foundry (AI/ML)
- Azure Key Vault (for secrets)
- Application Insights (monitoring)
- Log Analytics Workspace (logs)

## Usage

1. Review and update `main.parameters.json` with your environment values.
2. Use `azd up` to provision all resources.
3. Secrets and connection strings are managed via Key Vault and injected into App Service.

## Security

- All secrets are stored in Azure Key Vault.
- Managed Identity is used for secure resource access where possible.
- Least privilege and RBAC are enforced.
