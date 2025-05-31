// MSAL.js browser authentication for Azure AD (dynamic import for bundle splitting)
import { msalConfig } from '../../config/msal-config.js';

let msalInstance;

// DOM elements
const loginBtn = document.createElement('button');
loginBtn.id = 'login-btn';
loginBtn.textContent = 'Sign in with Azure AD';
const logoutBtn = document.createElement('button');
logoutBtn.id = 'logout-btn';
logoutBtn.textContent = 'Sign out';

async function ensureMsal() {
  if (!msalInstance) {
    const { PublicClientApplication } = await import('@azure/msal-browser');
    msalInstance = new PublicClientApplication(msalConfig);
  }
  return msalInstance;
}

function showLogin() {
  document.body.appendChild(loginBtn);
  loginBtn.onclick = async () => {
    const msal = await ensureMsal();
    msal.loginPopup().then(handleResponse);
  };
}

function showLogout(account) {
  document.body.appendChild(logoutBtn);
  logoutBtn.onclick = async () => {
    const msal = await ensureMsal();
    msal.logoutPopup({ account });
    location.reload();
  };
}

function handleResponse(response) {
  if (response && response.account) {
    localStorage.setItem('msalAccount', JSON.stringify(response.account));
    showLogout(response.account);
  } else {
    showLogin();
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  await ensureMsal();
  const currentAccounts = msalInstance.getAllAccounts();
  if (currentAccounts.length > 0) {
    showLogout(currentAccounts[0]);
  } else {
    showLogin();
  }
});
