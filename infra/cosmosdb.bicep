// Cosmos DB Bicep module
param databaseId string
param containerId string
param location string
param environmentName string
param resourceToken string

resource cosmosDbAccount 'Microsoft.DocumentDB/databaseAccounts@2023-04-15' = {
  name: 'cosmosdb-${resourceToken}'
  location: location
  kind: 'GlobalDocumentDB'
  tags: {
    environment: environmentName
    project: 'absolute-realms-dashboard'
  }
  properties: {
    databaseAccountOfferType: 'Standard'
    locations: [
      {
        locationName: location
        failoverPriority: 0
      }
    ]
    enableFreeTier: true
    // CORS: add allowed origins if needed
    cors: [
      {
        allowedOrigins: ['*'] // TODO: restrict in production
      }
    ]
  }
}

resource cosmosDbDatabase 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2023-04-15' = {
  parent: cosmosDbAccount
  name: databaseId
  properties: {
    resource: {
      id: databaseId
    }
  }
}

resource cosmosDbContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-04-15' = {
  parent: cosmosDbDatabase
  name: containerId
  properties: {
    resource: {
      id: containerId
      partitionKey: {
        paths: ['/id']
        kind: 'Hash'
      }
    }
  }
}

output connectionString string = listKeys(cosmosDbAccount.id, cosmosDbAccount.apiVersion).primaryMasterKey
