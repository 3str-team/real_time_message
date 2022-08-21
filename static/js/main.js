const field = document.querySelector(".message");

window.addEventListener("load", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("get", "/message");
  xhr.send();
  xhr.onload = () => {
    field.textContent = xhr.response;
  };
});
