const mouseDot = document.querySelector(".dot-cursor");
const glow = document.querySelector(".glow");

// Sets mouse dot off screen
mouseDot.style.left = "-5%";
mouseDot.style.top = "-5%";

document.addEventListener("DOMContentLoaded", () => {
  function getMousePosition(e) {
    // set mousedot position to mouse position
    mouseDot.style.left = e.clientX - mouseDot.offsetWidth / 2 + "px";
    mouseDot.style.top = e.clientY - mouseDot.offsetWidth / 2 + "px";

    // set first section glow position opposite to mouse position
    glow.style.left =
      window.innerWidth - e.clientX - glow.offsetWidth / 2 + "px";
    glow.style.top =
      window.innerHeight - e.clientY - glow.offsetWidth / 2 + "px";
  }

  // Check if device is a touch device
  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      getMousePosition(e);
    });
  } else {
    // set position of glow and mousedot to display none
    mouseDot.style.display = "none";
    glow.style.left = "-10%";
    glow.style.top = "-5%";
  }
});
