// MSAL (Azure AD) configuration
const isNode = typeof window === 'undefined';
export const msalConfig = {
  auth: {
    clientId: process.env.MSAL_CLIENT_ID || '',
    authority: process.env.MSAL_AUTHORITY || '',
    ...(isNode
      ? { clientSecret: process.env.MSAL_CLIENT_SECRET || '' }
      : { redirectUri: window.location.origin }
    )
  },
  ...(isNode
    ? {}
    : {
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false
      }
    }
  )
};
