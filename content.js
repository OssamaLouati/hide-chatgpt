const STORAGE_KEY = "privacyBlurEnabled";
const ROOT_CLASS = "chatgpt-privacy-blur-enabled";

function setEnabled(enabled, showNotice = false) {
  document.documentElement.classList.toggle(ROOT_CLASS, enabled);

  if (showNotice && document.body) {
    showStatusNotice(enabled);
  }
}

function showStatusNotice(enabled) {
  document.getElementById("chatgpt-privacy-blur-notice")?.remove();

  const notice = document.createElement("div");
  notice.id = "chatgpt-privacy-blur-notice";
  notice.textContent = `Privacy Blur ${enabled ? "enabled" : "disabled"}`;
  notice.setAttribute("role", "status");
  document.body.appendChild(notice);

  requestAnimationFrame(() => notice.classList.add("is-visible"));
  window.setTimeout(() => {
    notice.classList.remove("is-visible");
    window.setTimeout(() => notice.remove(), 180);
  }, 1600);
}

chrome.storage.local.get(STORAGE_KEY).then((stored) => {
  setEnabled(stored[STORAGE_KEY] ?? true);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local" || !changes[STORAGE_KEY]) return;
  setEnabled(changes[STORAGE_KEY].newValue, true);
});
