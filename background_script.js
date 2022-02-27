// Put all the javascript code here, that you want to execute in background.

// can communicate with content.js: after getting analysis about articles, send message to content.js to highlight or popup the message
// communicate with server for detecting biases or adding data to database

// create a context menu
browser.contextMenus.create({
  id: "bias_detection",
  title: "Detect Bias",
  contexts: ["selection"],
});

// add action listener to the context menu
browser.contextMenus.onClicked.addListener(contextMenuAction);

function contextMenuAction(info, tab) {
  const text = info.selectionText;
  console.log(text);
}
