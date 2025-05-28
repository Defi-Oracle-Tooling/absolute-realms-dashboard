const express = require('express');
const { ConfidentialClientApplication } = require('@azure/msal-node');
require('../config/env-loader');
const msalConfig = require('../config/msal-config');

const router = express.Router();
const cca = new ConfidentialClientApplication(msalConfig);

/**
 * Exchange authorization code for Azure AD token
 */
router.post('/login', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Authorization code is required' });
  try {
    const result = await cca.acquireTokenByCode({
      code,
      redirectUri: process.env.REDIRECT_URI,
      scopes: [process.env.API_SCOPE]
    });
    res.json({ accessToken: result.accessToken });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

/**
 * Validate provided JWT token
 */
router.post('/validate', (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Token is required' });
  try {
    const decoded = cca.getTokenCache().getAllAccessTokens().find(t => t.accessToken === token);
    if (!decoded) throw new Error('Token not found in cache');
    res.json({ valid: true });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
