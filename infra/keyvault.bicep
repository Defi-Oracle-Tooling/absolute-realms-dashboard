// Key Vault Bicep module
param location string
param environmentName string
param resourceToken string

resource keyVault 'Microsoft.KeyVault/vaults@2023-02-01' = {
  name: 'kv-${resourceToken}'
  location: location
  tags: {
    environment: environmentName
    project: 'absolute-realms-dashboard'
  }
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: subscription().tenantId
    accessPolicies: [
      // Grant App Service managed identity get/list secrets
      {
        tenantId: subscription().tenantId
        objectId: reference(resourceId('Microsoft.Web/sites', 'api-${resourceToken}'), '2023-01-01', 'Full').identity.principalId
        permissions: {
          secrets: ['get', 'list']
        }
      }
    ]
    enabledForDeployment: true
    enabledForTemplateDeployment: true
    enabledForDiskEncryption: true
  }
}

output vaultUri string = keyVault.properties.vaultUri
