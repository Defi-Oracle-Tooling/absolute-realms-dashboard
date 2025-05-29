// MSAL.js browser authentication for Azure AD
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '../../config/msal-config.js';

const msalInstance = new PublicClientApplication(msalConfig);

// DOM elements
const loginBtn = document.createElement('button');
loginBtn.id = 'login-btn';
loginBtn.textContent = 'Sign in with Azure AD';
const logoutBtn = document.createElement('button');
logoutBtn.id = 'logout-btn';
logoutBtn.textContent = 'Sign out';

function showLogin() {
  document.body.appendChild(loginBtn);
  loginBtn.onclick = () => msalInstance.loginPopup().then(handleResponse);
}

function showLogout(account) {
  document.body.appendChild(logoutBtn);
  logoutBtn.onclick = () => {
    msalInstance.logoutPopup({ account });
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

window.addEventListener('DOMContentLoaded', () => {
  const currentAccounts = msalInstance.getAllAccounts();
  if (currentAccounts.length > 0) {
    showLogout(currentAccounts[0]);
  } else {
    showLogin();
  }
});

export { msalInstance };
