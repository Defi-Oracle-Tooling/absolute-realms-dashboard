// Monitoring Bicep module
param location string
param environmentName string
param resourceToken string

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2023-04-01' = {
  name: 'logs-${resourceToken}'
  location: location
  tags: {
    environment: environmentName
    project: 'absolute-realms-dashboard'
  }
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
  }
}

resource appInsights 'Microsoft.Insights/components@2023-01-01' = {
  name: 'ai-${resourceToken}'
  location: location
  kind: 'web'
  tags: {
    environment: environmentName
    project: 'absolute-realms-dashboard'
  }
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalytics.id
  }
}

output appInsightsInstrumentationKey string = appInsights.properties.InstrumentationKey
output logAnalyticsWorkspaceId string = logAnalytics.id
