// main.bicep for Absolute Realms Dashboard
// Deploys App Service, Cosmos DB, Azure AI Foundry, Key Vault, App Insights, Log Analytics

param environmentName string
param location string = resourceGroup().location
param resourceGroupName string
param AZURE_COSMOS_DATABASE_ID string
param AZURE_COSMOS_CONTAINER_ID string
param AZURE_AI_FOUNDRY_DEPLOYMENT_NAME string

// Resource token for consistent naming
var resourceToken = uniqueString(subscription().id, resourceGroup().id, environmentName)

// Cosmos DB
module cosmosdb 'cosmosdb.bicep' = {
  name: 'cosmosdb'
  params: {
    databaseId: AZURE_COSMOS_DATABASE_ID
    containerId: AZURE_COSMOS_CONTAINER_ID
    location: location
    environmentName: environmentName
    resourceToken: resourceToken
  }
}

// Azure AI Foundry (placeholder, as this may require custom resource or manual setup)
module aiFoundry 'ai-foundry.bicep' = {
  name: 'aiFoundry'
  params: {
    deploymentName: AZURE_AI_FOUNDRY_DEPLOYMENT_NAME
    location: location
    environmentName: environmentName
    resourceToken: resourceToken
  }
}

// Key Vault
module keyvault 'keyvault.bicep' = {
  name: 'keyvault'
  params: {
    location: location
    environmentName: environmentName
    resourceToken: resourceToken
  }
}

// App Insights & Log Analytics
module monitoring 'monitoring.bicep' = {
  name: 'monitoring'
  params: {
    location: location
    environmentName: environmentName
    resourceToken: resourceToken
  }
}

// App Service
module appservice 'appservice.bicep' = {
  name: 'appservice'
  params: {
    location: location
    environmentName: environmentName
    resourceToken: resourceToken
    cosmosDbConnectionString: cosmosdb.outputs.connectionString
    aiFoundryEndpoint: aiFoundry.outputs.endpoint
    keyVaultUri: keyvault.outputs.vaultUri
    appInsightsInstrumentationKey: monitoring.outputs.appInsightsInstrumentationKey
    logAnalyticsWorkspaceId: monitoring.outputs.logAnalyticsWorkspaceId
  }
}

// Output resource group ID for azd
output RESOURCE_GROUP_ID string = resourceGroup().id
