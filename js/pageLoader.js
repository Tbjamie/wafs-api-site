const loaderContainer = document.querySelector(".loading");
const loaders = document.querySelectorAll(".loading-animation");

loaders.forEach((loader) => {
  loader.classList.add("animate");
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    loaders.forEach((loader) => {
      loader.classList.remove("animate");
    });
    loaderContainer.style.scale = "100";
    setTimeout(() => {
      loaderContainer.style.opacity = "0";
      setTimeout(() => {
        loaderContainer.style.display = "none";
      }, 500);
    }, 100);
  }, 2000);
});
