chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "replaceText",
    title: "Replace Text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "replaceText") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: replaceSelectedText,
      args: [info.selectionText]
    });
  }
});

function replaceSelectedText(selectedText) {
  let replacementText = prompt("Enter replacement text for: " + selectedText);
  if (replacementText !== null) {
    document.execCommand("insertText", false, replacementText);
  }
}
