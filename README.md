# DevFocus 

**DevFocus** is a lightweight and powerful Chrome extension designed to block all distracting or AI-based websites during your coding sessions. It helps you stay productive by allowing access only to that specific coding platform which you are using currently.

---

## 🧠 Why DevFocus?

With AI tools and social media becoming more accessible, distractions are just one click away. Whether you're practicing for competitive programming, preparing for tech interviews, or simply coding for a project, DevFocus helps eliminate every unnecessary tab — so that your focus stays on one thing: **Code.**

---

## ✨ Features

- 🔒 **Blocks all distracting and AI websites** (Instagram, ChatGPT, Gemini, etc.)
- ✅ **Allows only one coding platform** (e.g., Codeforces)
- 🧹 Minimal UI, maximum impact
- 🕒 Instant effect on install – no setup needed
- 🌙 Light footprint, no background resource usage

---

## ⚙️ How It Works

DevFocus uses the Chrome `declarativeNetRequest` API to intercept and block requests to known distracting and AI-related domains, except the one coding platform you whitelist (e.g., https://codeforces.com).

By default, the extension:
- ✅ ALLOWS: `https://codeforces.com`
- ❌ BLOCKS: `netflix.com`, `instagram.com`, `chat.openai.com`, `bard.google.com`, `gemini.google.com`, `facebook.com`, and many more.

---

## 📥 Installation

1. Download and extract `DevFocus` repository files.
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select this folder

## 📁 Files Included

| File | Description |
|------|-------------|
| `LICENSE` | Contains the license information for this extension. |
| `background.js` | Runs in the background and tracks time spent on each website. |
| `icon16.png`, `icon32.png`, `icon48.png`, `icon128.png` | Various icon sizes used for the extension (toolbar, store, etc.). |
| `manifest.json` | The metadata and configuration file for the Chrome extension. |
| `popup.html` | The HTML layout for the extension's popup UI. |
| `popup.js` | Handles the logic and interaction within the popup window. |
| `style.css` | Styles the popup interface to ensure a clean and minimal look. |
