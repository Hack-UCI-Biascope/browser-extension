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

  // tell content_script.js to start loading screen
  browser.tabs.sendMessage(tab.id, { to: "loading", body: text });

  async function run() {
    let response;
    const urlObj = new URL(info.pageUrl);
    const hostname = `https://${urlObj.hostname}`;
    response = await (
      await fetch("http://localhost:8000/api/article_bias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          website_url: hostname,
          paragraphs: ["a", "b"],
          chosen_paragraph: text,
        }),
      })
    ).json();

    // send the response details to content-script.js to render iframe
    browser.tabs.sendMessage(tab.id, {
      to: "render-iframe",
      coefficient: "0.9",
      pageUrl: hostname,
    });

    run();
  }
}

// listen from content_script.js and make necessary server request
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.to == "get_website_bias") {
    const urlObj = new URL(request.website_url);
    const hostname = `https://${urlObj.hostname}`;

    fetch(`http://localhost:8000/api/get_website_bias?website_url=${hostname}`)
      .then((res) => res.json())
      .then((res) => sendResponse(res))
      .catch((err) => sendResponse({ coefficient: -1 }));

    return true;
  }
});
