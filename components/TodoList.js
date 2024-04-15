import { createElement } from "../function/dom.js";

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

export class TodoList {
  /**@type {Todo[]} */
  #todos = [];

  /**
   * @type {HTMLElement}
   */
  #listElement = [];

  /**
   * @param {Todo[]} todos
   */
  constructor(todos) {
    this.#todos = todos;
  }

  /**
   *
   * @param {HTMLElement} element
   */
  appendTo(element) {
    element.innerHTML = `<form class="d-flex pb-4">
    <input
      required=""
      class="form-control"
      type="text"
      placeholder="Acheter des patates..."
      name="title"
      data-com.bitwarden.browser.user-edited="yes"
    />
    <button class="btn btn-primary">Ajouter</button>
  </form>
  <main>
    <div class="btn-group mb-4" role="group">
      <button
        type="button"
        class="btn btn-outline-primary active"
        data-filter="all"
      >
        Toutes
      </button>
      <button
        type="button"
        class="btn btn-outline-primary"
        data-filter="todo"
      >
        A faire
      </button>
      <button
        type="button"
        class="btn btn-outline-primary"
        data-filter="done"
      >
        Faites
      </button>
    </div>

    <ul class="list-group">   
    </ul>
  </main>`;
    this.#listElement = element.querySelector(".list-group");
    for (let todo of this.#todos) {
      const tache = new TodoListItems(todo);
      this.#listElement.append(tache.element);
    }
    element
      .querySelector("form")
      .addEventListener("submit", (i) => this.#onSubmit(i));
    element.querySelectorAll(".btn-group button").forEach((button) => {
      button.addEventListener("click", (i) => this.#toggleFilter(i));
    });
  }

  /** @param {SubmitEvent} i */
  #onSubmit(i) {
    i.preventDefault();
    const form = i.currentTarget;
    const title = new FormData(i.currentTarget).get("title").toString().trim();
    if (title === "") {
      return;
    }
    const todo = {
      id: Date.now(),
      title,
      completed: false,
    };
    const item = new TodoListItems(todo);
    this.#listElement.prepend(item.element);
    form.reset();
  }

  /** @param {PointerEvent} i */
  #toggleFilter(i) {
    i.preventDefault;
    const filter = i.currentTarget.getAttribute("data-filter");
    i.currentTarget.parentElement
      .querySelector(".active")
      .classList.remove("active");
    i.currentTarget.classList.add("active");
    if (filter === "todo") {
      this.#listElement.classList.add("hide-completed");
      this.#listElement.classList.remove("hide-todo");
    } else if (filter === "done") {
      this.#listElement.classList.add("hide-todo");
      this.#listElement.classList.remove("hide-completed");
    } else {
      this.#listElement.classList.remove("hide-completed");
      this.#listElement.classList.remove("hide-todo");
    }
  }
}

class TodoListItems {
  #element;
  /** @type {Todo}*/
  constructor(todo) {
    const id = `todo-${todo.id}`;
    const li = createElement("li", {
      class: "todo list-group-item d-flex align-items-center",
    });
    this.#element = li;
    const checkbox = createElement("input", {
      type: "checkbox",
      class: "form-check-input",
      id,
      checked: todo.completed ? "" : null,
    });
    const label = createElement("label", {
      class: "ms-2 form-check-label",
      for: id,
    });
    label.innerText = todo.title;
    const button = createElement("button", {
      class: "ms-auto btn btn-danger btn-sm",
    });
    button.innerHTML = "<i class='bi-trash'> </i>";
    li.append(label);
    li.append(checkbox);
    li.append(button);
    this.toggle(checkbox);

    button.addEventListener("click", (i) => this.remove(i));
    checkbox.addEventListener("change", (i) => this.toggle(i.currentTarget));
  }

  /**
   *
   * @return {HTMLElement}
   */
  get element() {
    return this.#element;
  }

  /**
   * @param {PointerEvent} i
   */
  remove() {
    this.#element.remove();
  }

  /**
   * Change l'état (à faire ou fait) de la tâche
   * @param {HTMLInputElement} checkbox */
  toggle(checkbox) {
    if (checkbox.checked) {
      this.#element.classList.add("is-completed");
    } else {
      this.#element.classList.remove("is-completed");
    }
  }
}
