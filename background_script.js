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

  let response;
  browser.tabs.sendMessage(tab.id, {
    to: "render-iframe",
    prob: 0.2,
    pageUrl: info.pageUrl,
  });
  // send text to server for detection
  // var data = new FormData();
  // data.append("website_url", info.pageUrl);
  // data.append("paragraphs", []);
  // data.append("chosen_paragraph", text);
  // response = await(
  //   await fetch("http://localhost:8000/api/article_bias", {
  //     method: "POST",
  //     body: data,
  //   })
  // ).json();

  // send the response details to content-script.js to render iframe
  // browser.tabs.sendMessage(tab.id, {
  //   to: "render-iframe",
  //   prob: response.coefficient,
  //   pageUrl: info.pageUrl,
  // });
}

// listen from content_script.js and make necessary server request
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.to) {
    case "add":
      fetch("https://isAI.piyo.cafe/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: request.url, prob: request.prob }),
      });
      break;
    case "get_website_bias":
      const urlObj = new URL(request.website_url);
      const hostname = String(urlObj.hostname);
      fetch(
        `http://localhost:8000/api/get_website_bias?website_url=${hostname}`
      )
        .then((res) => res.json())
        .then((res) => sendResponse(res))
        .catch((err) => sendResponse(err.message));
      return true;
  }
});
