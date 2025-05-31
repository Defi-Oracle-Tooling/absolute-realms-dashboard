// Azure AI Foundry Client Module
const axios = require('axios');
require('../config/env-loader');
const foundryConfig = require('../config/azure-ai-foundry-config');

/**
 * Generate text using Azure AI Foundry
 * @param {{deploymentName?: string, prompt: string, max_tokens?: number, temperature?: number}} options
 * @returns {Promise<string>} Generated text
 */
async function generateText({ deploymentName = foundryConfig.deploymentName, prompt, max_tokens = 150, temperature = 0.7 }) {
  try {
    const response = await axios.post(
      `${foundryConfig.endpoint}/openai/deployments/${deploymentName}/completions?api-version=2024-02-15-preview`,
      {
        prompt,
        max_tokens,
        temperature
      },
      {
        headers: {
          'api-key': foundryConfig.apiKey,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Azure AI Foundry error:', error.response?.data || error);
    throw error;
  }
}

module.exports = { generateText };
