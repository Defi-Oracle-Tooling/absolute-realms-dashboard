// Azure Cosmos DB configuration stub
module.exports = {
  endpoint: process.env.AZURE_COSMOS_ENDPOINT,
  key: process.env.AZURE_COSMOS_KEY,
  databaseId: process.env.AZURE_COSMOS_DATABASE_ID || 'tasks-db',
  containerId: process.env.AZURE_COSMOS_CONTAINER_ID || 'tasks',
};
