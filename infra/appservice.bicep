// App Service Bicep module
param location string
param environmentName string
param resourceToken string
param cosmosDbConnectionString string
param aiFoundryEndpoint string
param keyVaultUri string
param appInsightsInstrumentationKey string
param logAnalyticsWorkspaceId string

resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: 'plan-${resourceToken}'
  location: location
  sku: {
    name: 'B1'
    tier: 'Basic'
  }
  tags: {
    environment: environmentName
    project: 'absolute-realms-dashboard'
  }
}

resource appService 'Microsoft.Web/sites@2023-01-01' = {
  name: 'api-${resourceToken}'
  location: location
  kind: 'app'
  tags: {
    environment: environmentName
    project: 'absolute-realms-dashboard'
  }
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      cors: {
        allowedOrigins: ['https://lively-ocean-07e970603.6.azurestaticapps.net', 'http://localhost:3000']
      }
      appSettings: [
        {
          name: 'COSMOSDB_CONNECTION_STRING'
          value: cosmosDbConnectionString
        }
        {
          name: 'AI_FOUNDRY_ENDPOINT'
          value: aiFoundryEndpoint
        }
        {
          name: 'KEY_VAULT_URI'
          value: keyVaultUri
        }
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsightsInstrumentationKey
        }
        {
          name: 'LOG_ANALYTICS_WORKSPACE_ID'
          value: logAnalyticsWorkspaceId
        }
      ]
    }
  }
}
