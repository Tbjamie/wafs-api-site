const template = document.querySelector("template");
const result = document.querySelector("#result");
const engine = new liquidjs.Liquid();

try {
  const response = await fetch(
    'https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"CMD%20Minor%20Web%20Dev"}}}},{"squads":{"squad_id":{"cohort":"2425"}}}]}'
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();

  json.data.forEach((person) => {
    if (person.github_handle && person.github_handle.includes("@")) {
      person.github_handle = person.github_handle.replace("@", "");
      console.log(person.github_handle);
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
