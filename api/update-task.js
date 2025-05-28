const express = require('express');
const router = express.Router();
const { updateTask } = require('./task-service');
require('../config/env-loader');

/**
 * Update an existing task in Firestore
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    await updateTask(id, updates);
    res.status(200).json({ id, ...updates });
  } catch (err) {
    console.error('Update task error:', err);
    res.status(500).json({ error: 'Task update failed' });
  }
});

module.exports = router;