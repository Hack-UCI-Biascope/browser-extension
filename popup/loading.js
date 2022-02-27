document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < 30; i++) {
    let emoji = "";
    switch (Math.floor(Math.random() * 2)) {
      case 0:
        emoji = "🔴";
        // emoji = "🤬";
        break;
      case 1:
        emoji = "🔵";
        // emoji = "😡";
        break;
      case 2:
        emoji = "🤔";
        break;
      case 3:
        emoji = "😕";
        break;
    }
    let elem = document.createElement("div");
    elem.innerHTML = emoji;
    elem.className = "moving";
    elem.style.animation = `horizontal ${Math.random() * 5 + 7.5}s linear -${
      Math.random() * 3600
    }s infinite alternate,
            vertical ${Math.random() * 5 + 7.5}s linear -${
      Math.random() * 3600
    }s infinite alternate`;
    document.getElementById("moving-container").append(elem);
  }
});
