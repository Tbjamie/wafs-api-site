document.addEventListener("DOMContentLoaded", () => {
  const template = document.querySelector("template");
  const result = document.querySelector("#result");
  const engine = new liquidjs.Liquid();

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

        json.data.forEach((person) => {
          if (person.github_handle && person.github_handle.includes("@")) {
            person.github_handle = person.github_handle.replace("@", "");
          }

          if (
            person.avatar == null ||
            person.avatar == "" ||
            person.avatar == " "
          ) {
            person.avatar = null;
          }
        });

        engine
          .parseAndRender(template.innerHTML, { persons: json.data })
          .then((html) => (result.innerHTML = html));
      } catch (error) {
        if (error) {
          console.error("Error: ", error);
        }
      }
    } else {
      return `<h1>Jamie Tirbeni</h1>`;
    }
  }

  fetchData();
});
