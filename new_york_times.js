// Put all the javascript code here, that you want to execute after page load.
// access database and warn users if this website tends to be biased
// get message from background_script.js and manipulate the current website (highlight paragraphs) and show message/data on pop up.

// helper function to create iFrame
function initFrame(frame) {
  frame.seamless = true;
  frame.width = "500px";
  frame.height = "200px";
  frame.id = "biascope-modal";

  frame.style.position = "fixed";
  frame.style.zIndex = "1000000";
  frame.style.top = "10px";
  frame.style.right = "10px";
  frame.style.borderRadius = "5px";
  frame.style.borderStyle = "none";
  frame.style.boxShadow = "rgba(0,0,0,0.25) 0 4px 8px";
}

window.website_average = undefined;

// scrape the page for paragraphs and highlight them
const paragraphs = document.querySelector("section[role='feed']").querySelectorAll("p");
let articleParagraphs = [];
for (let p of paragraphs) {
  if (p.textContent.trim().length > 0) {
    articleParagraphs.push(p.textContent.trim());
  } else {
      break;
  }
}
console.log(articleParagraphs);
// make API call to get the bias of the article
browser.runtime.sendMessage({
  to: "get_article_bias",
  url: window.location.origin,
  paragraphs: articleParagraphs,
},
(res) => {
  const articleBias = res.coefficient;
  // display article bias
  // if (articleBias >= 0.7 || articleBias <= 0.3) {
    if (true) {
      isNew = false;
      let frame = document.getElementById("biascope-modal");

      if (!frame) {
        isNew = true;
        frame = document.createElement("iframe");
        initFrame(frame);
      }

      frame.src = browser.runtime.getURL(
        `/stats.html?prob=${articleBias}&net=${articleBias}&size=${window.isAI_count}&url=${window.location.origin}&type=Peers`
      );

      if (isNew) document.body.prepend(frame);
    }
  const paragraphBiases = res.paragraphBiases;
  console.log(paragraphBiases);
  // highlight paragraphs
  for (let index = 0; index < paragraphs.length; index++) {
    const paragraph = paragraphs[index];
    const paragraphBias = paragraphBiases[index];
    let color = "";
    switch (paragraphBias) {
      case paragraphBias < 0.2:
        color = "#0f34a6";
        break;
      case paragraphBias < 0.4:
        color = "#413088";
        break;
      case paragraphBias < 0.6:
        color = "#722a6a";
        break;
      case paragraphBias < 0.8:
        color = "#a2274b";
        break;
      case paragraphBias <= 1:
        color = "#f62d2c";
        break;
      default:
        break;
    }
    paragraph.style.backgroundColor = color;
  }

});


browser.runtime.sendMessage(
  { to: "get_website_bias", website_url: window.location.origin },
  (res) => {
    window.website_average = res.coefficient;

    // if (res.coefficient >= 0.7 || res.coefficient <= 0.3) {
    if (true) {
      isNew = false;
      let frame = document.getElementById("biascope-modal");

      if (!frame) {
        isNew = true;
        frame = document.createElement("iframe");
        initFrame(frame);
      }

      frame.src = browser.runtime.getURL(
        `/stats.html?prob=${window.website_average}&net=${window.website_average}&size=${window.isAI_count}&url=${window.location.origin}&type=Peers`
      );

      if (isNew) document.body.prepend(frame);
    }
  }
);

// listen to background_script to render iFrame (loading or detection result)
browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  let frame = document.getElementById("biascope-modal");

  switch (request.to) {
    case "render-iframe":
      isNew = false;

      if (!frame) {
        isNew = true;
        frame = document.createElement("iframe");
        initFrame(frame);
      }

      console.log(request.pageUrl);

      frame.src = browser.runtime.getURL(
        `./popup/stats.html?prob=${request.coefficient}&net=${window.website_average}&url=${request.pageUrl}`
      );
      browser.runtime.sendMessage({
        to: "add",
        url: window.location.origin,
        prob: request.prob,
      });

      if (isNew) document.body.prepend(frame);
      break;
    case "loading":
      isNew = false;

      if (!frame) {
        isNew = true;
        frame = document.createElement("iframe");
        initFrame(frame);
      }

      frame.src = browser.runtime.getURL("./popup/loading.html");

      if (isNew) document.body.prepend(frame);
      break;
    case "highlight":
      // highlight paragraphs
  }
});



