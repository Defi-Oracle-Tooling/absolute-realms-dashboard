const express = require('express');
const cors = require('cors');
require('../config/env-loader'); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => res.json({ status: 'ok' }));

// Define basic routes
app.use('/auth', require('./auth'));
app.use('/generate-task', require('./generate-task'));
app.use('/update-task', require('./update-task'));

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
