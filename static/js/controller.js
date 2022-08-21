const wrapper = document.querySelector(".wrapper");
const input = document.querySelector("input");
let loaderDelay;

const showLoader = () => {
  loaderDelay = setTimeout(() => {
    wrapper.classList.add("loading");
  }, 500);
};

const hideLoader = () => {
  clearInterval(loaderDelay);
  if (wrapper.classList.contains("loading")) {
    wrapper.classList.remove("loading");
  }
  input.placeholder = "Напишите что-нибудь";
};

window.addEventListener("load", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("get", "/message");
  xhr.send();
  showLoader();
  xhr.onload = () => {
    input.value = xhr.response;
    hideLoader();
  };
});
