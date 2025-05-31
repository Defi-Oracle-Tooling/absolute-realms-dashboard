const express = require('express');
const { getTask, listTasks, deleteTask } = require('./task-service');
require('../config/env-loader');

const router = express.Router();

/** List all tasks */
router.get('/', async (req, res) => {
  try {
    const tasks = await listTasks();
    res.json(tasks);
  } catch (err) {
    console.error('List tasks error:', err);
    res.status(500).json({ error: 'Failed to list tasks' });
  }
});

/** Get a task by ID */
router.get('/:id', async (req, res) => {
  try {
    const task = await getTask(req.params.id);
    res.json(task);
  } catch (err) {
    console.error('Get task error:', err);
    res.status(500).json({ error: 'Failed to get task' });
  }
});

/** Delete a task by ID */
router.delete('/:id', async (req, res) => {
  try {
    await deleteTask(req.params.id);
    res.json({ id: req.params.id });
  } catch (err) {
    console.error('Delete task error:', err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
