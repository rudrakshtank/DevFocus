const toggleBtn = document.getElementById("toggleBtn");
const platformName = document.getElementById("platformName");
const message = document.getElementById("message");

const allowedCodingPlatforms = [
  "leetcode.com",
  "codeforces.com",
  "geeksforgeeks.org",
  "codechef.com",
  "atcoder.jp",
  "hackerrank.com"
];

async function getCurrentTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
}

function extractDomain(hostname) {
  return hostname.startsWith("www.") ? hostname.slice(4) : hostname;
}

async function updateUI() {
  const tab = await getCurrentTab();
  if (!tab) return;

  const url = new URL(tab.url);
  const hostname = url.hostname;

  const isCodingPlatform = allowedCodingPlatforms.some(domain => hostname.endsWith(domain));
  if (!isCodingPlatform) {
    platformName.textContent = "Not a supported coding platform.";
    toggleBtn.disabled = true;
    toggleBtn.textContent = "Disabled";
    return;
  }

  platformName.textContent = `Current platform: ${extractDomain(hostname)}`;
  toggleBtn.disabled = false;

  chrome.storage.local.get(["focusMode", "allowedDomain"], ({ focusMode, allowedDomain }) => {
    toggleBtn.textContent =
      focusMode && allowedDomain === hostname
        ? "Turn OFF Focus Mode"
        : "Turn ON Focus Mode";
    message.textContent = "";
  });
}

toggleBtn.addEventListener("click", async () => {
  const tab = await getCurrentTab();
  if (!tab) return;

  const url = new URL(tab.url);
  const hostname = url.hostname;

  chrome.storage.local.get(["focusMode", "allowedDomain"], ({ focusMode }) => {
    if (focusMode) {
      toggleBtn.textContent = "Turn ON Focus Mode";
      chrome.storage.local.set({ focusMode: false });
      chrome.storage.local.remove(["allowedDomain"]);
      message.textContent = "";

      chrome.runtime.sendMessage({ action: "disableFocusMode" });

      chrome.tabs.reload(tab.id);
    } 
    else {
      toggleBtn.textContent = "Turn OFF Focus Mode";
      message.textContent = "";

      chrome.storage.local.set({ allowedDomain: hostname, focusMode: true });

      chrome.runtime.sendMessage({ action: "enableFocusMode", url: tab.url }, (response) => {
        if (response?.error) {
          toggleBtn.textContent = "Turn ON Focus Mode";
          message.textContent = response.error;
        }
      });

      chrome.tabs.reload(tab.id);
    }
  });
});

updateUI();
