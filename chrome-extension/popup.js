// Extension configuration
const CONFIG = {
  // Use production by default, allow localhost override via env
  auditGptUrl: 'https://scrutexity.com',
  // Optional: check for local dev via environment
  isDev: localStorage.getItem('scrutexity_dev_mode') === 'true',
};

if (CONFIG.isDev) {
  CONFIG.auditGptUrl = 'http://localhost:3000';
}

// Get current tab URL and populate the popup
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentTab = tabs[0];
  const currentUrl = currentTab.url;

  if (currentUrl) {
    const urlDisplay = document.getElementById('url-display');
    const urlSection = document.getElementById('url-section');

    urlDisplay.textContent = currentUrl;
    urlSection.style.display = 'block';
  }
});

// Handle "Generate Receipt" button
document.getElementById('auditBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    const currentUrl = currentTab.url;

    if (!currentUrl) {
      showStatus('Unable to get page URL', 'error');
      return;
    }

    // Encode the URL as a query param and open the audit/receipt form
    const encodedUrl = encodeURIComponent(currentUrl);
    const receiptUrl = `${CONFIG.auditGptUrl}/claim-receipt?url=${encodedUrl}`;

    chrome.tabs.create({ url: receiptUrl });

    // Optional: close the popup after opening
    window.close();
  });
});

// Handle "Verify Receipt" button - opens the verify page
document.getElementById('verifyBtn').addEventListener('click', () => {
  const verifyUrl = `${CONFIG.auditGptUrl}/verify-receipt`;
  chrome.tabs.create({ url: verifyUrl });
  window.close();
});

// Helper to show status messages
function showStatus(message, type = 'info') {
  const statusEl = document.getElementById('status');
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
  statusEl.style.display = 'block';

  if (type !== 'loading') {
    setTimeout(() => {
      statusEl.style.display = 'none';
    }, 3000);
  }
}
