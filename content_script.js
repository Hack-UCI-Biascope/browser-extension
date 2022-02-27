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

browser.runtime.sendMessage(
  { to: "get_website_bias", website_url: window.location.origin },
  (res) => {
    return console.log(res);
    window.website_average = res.avg;
    window.isAI_count = res.count;

    if (res.avg >= 0.2) {
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

      frame.src = browser.runtime.getURL(
        `./popup/stats.html?prob=${request.prob}&net=${window.website_average}&size=${window.isAI_count}&url=${request.pageUrl}&type=${request.type}`
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
  }
});
