const mouseDot = document.querySelector(".dot-cursor");
mouseDot.style.left = "-5%";
mouseDot.style.top = "-5%";

document.addEventListener("DOMContentLoaded", () => {
  function getMousePosition(e) {
    mouseDot.style.left = e.clientX - mouseDot.offsetWidth / 2 + "px";
    mouseDot.style.top = e.clientY - mouseDot.offsetWidth / 2 + "px";
  }

  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      getMousePosition(e);
    });
  } else {
    mouseDot.style.display = "none";
  }

  // TODO: Geef de values mee aan CSS Variabelen
});
