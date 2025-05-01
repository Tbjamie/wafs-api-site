const sectionEl = document.querySelector("main section:first-of-type");
const selectEl = document.querySelector("select");

async function getData() {
  try {
    const response = await fetch("../data/weeklyNerds.json");
    const articles = await response.json();

    return articles;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

function createCard() {
  getData().then((articles) => {
    articles.forEach((article) => {
      const card = document.createElement("article");
      card.classList.add("card");

      card.innerHTML = `
        <a href="./${article.slug}">
            <img src="${article.image}" alt="${article.title}" />
            <div>
                <div>
                    <h3>${article.person}</h3>
                    <p>${article.title}</p>
                </div>
                <svg tabindex="0" class="fav-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 540" fill="currentColor"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
            </div>
        </a>
      `;

      sectionEl.append(card);
    });
  });
}

function addToFavorites() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const favButton = card.querySelector(".fav-button");
    favButton.addEventListener("click", (e) => {
      e.preventDefault();
      card.classList.toggle("favorite");
    });
  });
}

createCard();

setTimeout(addToFavorites, 1000);

function filter() {
  const favorites = document.querySelectorAll(".favorite");
  const nonFavorites = document.querySelectorAll(".card:not(.favorite)");
  const cards = document.querySelectorAll(".card");
  const noMatchesMessage = document.createElement("p");
  sectionEl.append(noMatchesMessage);

  noMatchesMessage.style.display = "none";

  if (selectEl.value.toLowerCase() === "favorites") {
    nonFavorites.forEach((card) => {
      card.style.opacity = "0";
      card.style.position = "absolute";
      card.style.pointerEvents = "none";
    });

    // if (favorites.length === 0) {
    //   noMatchesMessage.innerText = "No favorites yet!";
    //   noMatchesMessage.style.display = "block";
    // }
  } else if (selectEl.value.toLowerCase() === "speakers") {
    console.log("speakers");
  } else if (selectEl.value.toLowerCase() === "lectures") {
    console.log("lectures");
  } else {
    console.log("all");
    cards.forEach((card) => {
      card.style.opacity = "1";
      card.style.position = "relative";
      card.style.pointerEvents = "all";
    });
    // noMatchesMessage.style.display = "none";

    // if (cards.length === 0) {
    //   noMatchesMessage.innerText = "Nothing here yet!";
    //   noMatchesMessage.style.display = "block";
    // }
  }
}

setTimeout(filter, 1000);

selectEl.addEventListener("change", () => {
  filter();
});

async function getDetailPage(slug) {
  try {
    const articles = await getData();
    const article = articles.find((article) => article.slug === slug);

    if (!article) {
      throw new Error("Article not found");
    }

    return article;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

// DETAILPAGE

let currentPage = window.location.hash;

async function getDetailData() {
  // Check if detail content already exists
  const existingDetailContent = document.querySelector(".detail-content");
  if (existingDetailContent) {
    return; // Exit the function if detail content already exists
  }

  currentPage = window.location.hash;
  console.log("Current page", currentPage);

  if (currentPage) {
    const slug = `/weekly-nerd/${currentPage}`;
    const data = await fetch("../data/weeklyNerds.json");
    const articles = await data.json();
    const article = articles.find((article) => article.slug === slug);
    const articleEl = document.querySelector(
      `main section:first-of-type article a[href="${slug}"]`
    ).parentElement;

    selectEl.style.display = "none";

    sectionEl.style.display = "block";

    const summaryHeading = document.createElement("h2");
    summaryHeading.classList.add("detail-heading");
    summaryHeading.innerText = `Samenvatting van ${article.title}`;

    const detailContent = document.createElement("p");

    detailContent.classList.add("detail-content");
    detailContent.innerText = `${article.content}`;

    const reflectionHeading = document.createElement("h2");
    reflectionHeading.classList.add("detail-heading");
    reflectionHeading.innerText = `Reflectie`;

    const reflectionContent = document.createElement("p");
    reflectionContent.classList.add("detail-content");
    reflectionContent.innerText = `${article.reflection}`;

    // Create back button with arrow icon
    const backButton = document.createElement("button");
    backButton.classList.add("back-button");
    backButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free--><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
      <span class="back-button-text">Back to overview</span>
    `;

    backButton.addEventListener("click", () => {
      window.location.hash = "";
      location.reload();
    });

    // Insert back button at the top
    sectionEl.prepend(backButton);

    // Add original content
    sectionEl.append(summaryHeading);
    sectionEl.append(detailContent);
    sectionEl.append(reflectionHeading);
    sectionEl.append(reflectionContent);

    articleEl.classList.add("detail-article");

    // Hide all other articles
    const allArticles = document.querySelectorAll(
      "main section:first-of-type article"
    );
    allArticles.forEach((articleEl) => {
      console.log("OTHER ARTICLES", articleEl);
      const articleSlug = articleEl.querySelector("a").getAttribute("href");
      if (articleSlug !== slug) {
        articleEl.style.display = "none";
        articleEl.classList.remove("detail-article");
      }
    });
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// TODO: 3 LEERDOELEN BEDENKEN VOOR DE MEESTERPROEF
// TODO: ZORG DAT JE TERUG KAN NAVIGEREN NAAR DE OVERZICHTSPAGINA
// TODO: VUL ALLE CONTENT IN VOOR DE WEEKLY NERDS

document.addEventListener(
  "click",
  () => {
    setTimeout(async () => {
      getDetailData();
    });
  },
  100
);

document.addEventListener(
  "DOMContentLoaded",
  () => {
    setTimeout(async () => {
      getDetailData();
    });
  },
  100
);
