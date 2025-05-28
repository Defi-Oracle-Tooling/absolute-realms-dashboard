// MSAL (Azure AD) configuration stub
export const msalConfig = {
  auth: {
    clientId: process.env.MSAL_CLIENT_ID,
    authority: process.env.MSAL_AUTHORITY,
    redirectUri: window.location.origin
  }
};
