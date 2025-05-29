// MSAL (Azure AD) configuration stub
// MSAL (Azure AD) configuration
export const msalConfig = {
  auth: {
    clientId: process.env.MSAL_CLIENT_ID || '',
    authority: process.env.MSAL_AUTHORITY || '',
    redirectUri: typeof window !== 'undefined' ? window.location.origin : process.env.REDIRECT_URI || 'http://localhost:3000'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  }
};
