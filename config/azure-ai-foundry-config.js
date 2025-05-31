// Azure AI Foundry configuration stub
module.exports = {
    endpoint: process.env.AZURE_AI_FOUNDRY_ENDPOINT,
    apiKey: process.env.AZURE_AI_FOUNDRY_KEY,
    deploymentName: process.env.AZURE_AI_FOUNDRY_DEPLOYMENT_NAME || 'gpt-task-gen',
};
