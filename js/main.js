document.addEventListener("DOMContentLoaded", () => {
  const template = document.querySelector("template");
  const result = document.querySelector("#result");
  const engine = new liquidjs.Liquid();

  // fetching the data
  async function fetchData() {
    if (engine) {
      try {
        const response = await fetch(
          'https://fdnd.directus.app/items/person/?filter={"id":206}'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();

        // if there is a github handle with @ remove it
        json.data.forEach((person) => {
          if (person.github_handle && person.github_handle.includes("@")) {
            person.github_handle = person.github_handle.replace("@", "");
          }
        });

        // parse this data to use it with liquidjs in the HTML
        engine
          .parseAndRender(template.innerHTML, { persons: json.data })
          .then((html) => (result.innerHTML = html));
      } catch (error) {
        if (error) {
          console.error("Error: ", error);
        }
      }
    }
  }

  fetchData();
});
