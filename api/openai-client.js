// OpenAI Client Module
const { Configuration, OpenAIApi } = require('openai');
// Load environment variables
require('../config/env-loader');

// Configure OpenAI API
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

/**
 * Generate text using OpenAI
 * @param {{model?: string, prompt: string, max_tokens?: number, temperature?: number}} options
 * @returns {Promise<string>} Generated text
 */
async function generateText({ model = 'text-davinci-003', prompt, max_tokens = 150, temperature = 0.7 }) {
  try {
    const response = await openai.createCompletion({ model, prompt, max_tokens, temperature });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('OpenAI error:', error);
    throw error;
  }
}

module.exports = { generateText };
