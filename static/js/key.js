const keyInput = document.querySelector(".key");
keyInput.value = localStorage["RealTimeMessageKey"] || "";
let key = keyInput.value;

keyInput.oninput = () => {
  key = keyInput.value;
  localStorage["RealTimeMessageKey"] = key;
};
