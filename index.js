import { TodoList } from "./components/TodoList.js";
import { fetchJSON } from "./function/api.js";
import { createElement } from "./function/dom.js";

try {
  const todos = await fetchJSON(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  const list = new TodoList(todos);
  list.appendTo(document.querySelector("#todolist"));
  console.log(todos);
} catch (i) {
  const AlertElement = createElement("div", {
    class: "alert altert-danger",
    role: "alert",
  });
  AlertElement.innerText = "Impossible de charger les éléments.";
  document.body.prepend(AlertElement);
  console.error(i);
}
