const express = require('express');
const router = express.Router();
const { generateText } = require('./openai-client');
const { createTask } = require('./task-service');
// Load environment variables
require('../config/env-loader');

/**
 * Generate a new task using AI and store in Firestore
 */
router.post('/', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });
  try {
    const description = await generateText({ model: 'text-davinci-003', prompt });
    const taskData = { prompt, description, createdAt: new Date().toISOString() };
    const docRef = await createTask(taskData);
    res.status(201).json({ id: docRef.id, ...taskData });
  } catch (err) {
    console.error('Generate task error:', err);
    res.status(500).json({ error: 'Task generation failed' });
  }
});

module.exports = router;
