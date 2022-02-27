document.addEventListener("DOMContentLoaded", () => {
  const query = window.location.search;
  const params = new URLSearchParams(query);
  var url = params.get("url");
  var prob = Math.round(parseFloat(params.get("prob")) * 100);
  var net = Math.round(parseFloat(params.get("net")) * 100);
  var type = params.get("type");
  if (prob === 100) prob = 99;
  if (prob === 0) prob = 1;
  if (net === 100) net = 99;
  if (net === 0) net = 1;

  if (type == "paragraph")
    document.getElementById("type").innerHTML = "Paragraph";
  else document.getElementById("type").innerHTML = "Article";

  const progressBar = document.getElementsByClassName("progress-bar")[0];
  //
  if (prob >= 80) {
    document.getElementById("conclusion").innerHTML = "Right";
    progressBar.style.setProperty("--inside_color", "#f62d2c");
  } else if (prob >= 60) {
    document.getElementById("conclusion").innerHTML = "Lean Right";
    progressBar.style.setProperty("--inside_color", "#a2274b");
  } else if (prob >= 40) {
    document.getElementById("conclusion").innerHTML = "Center";
    progressBar.style.setProperty("--inside_color", "#722a6a");
  } else if (prob >= 20) {
    document.getElementById("conclusion").innerHTML = "Lean Left";
    progressBar.style.setProperty("--inside_color", "#413088");
  } else {
    document.getElementById("conclusion").innerHTML = "Left";
    progressBar.style.setProperty("--inside_color", "#0f34a6");
  }

  let buffer = 3;
  let width = Math.abs(prob - 50);
  if (prob < 50) {
    //left
    left = 50 - width + buffer;
  } else if (prob > 50) {
    // right
    left = 50 - buffer;
  }

  const computedStyle = getComputedStyle(progressBar);
  progressBar.style.setProperty("--width", width);
  progressBar.style.setProperty("--left", left);
});
