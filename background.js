const allowedCodingPlatforms = [
  "leetcode.com",
  "codeforces.com",
  "geeksforgeeks.org",
  "codechef.com",
  "atcoder.jp"
];

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.action === "enableFocusMode") {
    const url = new URL(msg.url);
    const hostname = url.hostname;

    // Check if current site is a coding platform
    const isCodingPlatform = allowedCodingPlatforms.some(domain => hostname.endsWith(domain));

    if (!isCodingPlatform) {
      sendResponse({ error: "Not a supported coding platform!" });
      return;
    }

    // Block everything except current domain and subdomains
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1001],
      addRules: [
        {
          id: 1001,
          priority: 1,
          action: { type: "block" },
          condition: {
            urlFilter: "*",
            excludedDomains: [hostname, `.${hostname}`],
            resourceTypes: ["main_frame"]
          }
        }
      ]
    });

    chrome.storage.local.set({ focusMode: true, allowedDomain: hostname });
    sendResponse({ success: true });
  }

  if (msg.action === "disableFocusMode") {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1001]
    });

    chrome.storage.local.set({ focusMode: false });
    sendResponse({ success: true });
  }
});
