const loaderContainer = document.querySelector(".loading");
const loaders = document.querySelectorAll(".loading-animation");

// Add animate class to loaders (divs)
loaders.forEach((loader) => {
  loader.classList.add("animate");
});

// transition from the loading screen to the page
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
