
// Azure Cosmos DB SDK
const { CosmosClient } = require('@azure/cosmos');
require('../config/env-loader');
const cosmosConfig = require('../config/azure-cosmos-config');

const client = new CosmosClient({ endpoint: cosmosConfig.endpoint, key: cosmosConfig.key });
const database = client.database(cosmosConfig.databaseId);
const container = database.container(cosmosConfig.containerId);

/** Create a new task document */
async function createTask(data) {
  const { resource } = await container.items.create(data);
  return resource;
}

/** Update an existing task by ID */
async function updateTask(id, data) {
  // Patch operation for partial update
  await container.item(id, id).replace({ id, ...data });
}

/** Get a task by ID */
async function getTask(id) {
  const { resource } = await container.item(id, id).read();
  return resource;
}

/** List all tasks */
async function listTasks() {
  const { resources } = await container.items.readAll().fetchAll();
  return resources;
}

/** Delete a task by ID */
async function deleteTask(id) {
  await container.item(id, id).delete();
}

module.exports = { createTask, updateTask, getTask, listTasks, deleteTask };
