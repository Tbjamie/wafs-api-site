const navLinks = document.querySelectorAll("nav ul li a");
const path = window.location.pathname;

function setActivePage() {
  if (path === "/") {
    navLinks.forEach((link) => {
      link.getAttribute("href") === "/"
        ? link.classList.add("active-page")
        : link.classList.remove("active-page");
    });
  } else if (path.includes("/weekly-nerd")) {
    navLinks.forEach((link) => {
      link.getAttribute("href") === "/weekly-nerd"
        ? link.classList.add("active-page")
        : link.classList.remove("active-page");
    });
  } else if (path.includes("/goals")) {
    navLinks.forEach((link) => {
      link.getAttribute("href") === "/goals"
        ? link.classList.add("active-page")
        : link.classList.remove("active-page");
    });
  } else if (path.includes("/meesterproef")) {
    navLinks.forEach((link) => {
      link.getAttribute("href") === "/meesterproef"
        ? link.classList.add("active-page")
        : link.classList.remove("active-page");
    });
  }
}

setActivePage();

navLinks.forEach((link) => {
  if (link.classList.contains("active-page")) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }
});
