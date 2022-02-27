document.addEventListener("DOMContentLoaded", () => {
  // const query = window.location.search;
  // const params = new URLSearchParams(query);
  // var url = params.get("url");
  // var prob = Math.round(parseFloat(params.get("prob")) * 100);
  // var net = Math.round(parseFloat(params.get("net")) * 100);
  // var size = params.get("size");
  // var type = params.get("type");
  // if (prob === 100) prob = 99;
  // if (prob === 0) prob = 1;
  // if (net === 100) net = 99;
  // if (net === 0) net = 1;
  // if (isNaN(net)) {
  //   document.getElementById("isAI-bar-text").innerHTML =
  //     "No other results found online...";
  //   document.getElementById("isAI-bar").style.width = "0%";
  // } else {
  //   document.getElementById(
  //     "isAI-bar-text"
  //   ).innerHTML = `${net}% according to ${size} other results`;
  //   document.getElementById("isAI-bar").style.width = `${net}%`;
  // }

  // //
  // if (prob >= 80) {
  //   document.getElementById("isAI-conclusion").innerHTML = "Right";
  // } else if (prob >= 60) {
  //   document.getElementById("isAI-conclusion").innerHTML = "Lean Right";
  // } else if (prob >= 40) {
  //   document.getElementById("isAI-conclusion").innerHTML = "Center";
  // } else if (prob >= 20) {
  //   document.getElementById("isAI-conclusion").innerHTML = "Lean Left";
  // } else {
  //   document.getElementById("isAI-conclusion").innerHTML = "Left";
  // }

  const progressBar = document.getElementsByClassName("progress-bar")[0];
  const computedStyle = getComputedStyle(progressBar);
  progressBar.style.setProperty("--width", 0);
  progressBar.style.setProperty("--left", 47);

  // let buffer = 3

  // let width = abs(prob - 0.5) * 100
  // if prob < 0.5 (left)
  // left = 50 - width + buffer
  // if prob > 0.5 (right)
  // left = 50 - buffer

  // color
  // left: #0f34a6
  // lean left: #413088
  // center: #722a6a
  // lean right: #a2274b
  // right: #f62d2c
});
