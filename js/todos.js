let todoItems = [];

const add = document.querySelector(".add");

function renderTodo(todo) {
  const list = document.querySelector(".todo-list");
  const item = document.createElement("div");

  item.classList.add("item");

  item.innerHTML = todo.text;

  list.append(item);
}

function addTodo(text) {
  const todo = {
    text,
  };

  todoItems.push(todo);
  renderTodo(todo);
}

add.addEventListener("click", () => {
  const input = document.querySelector(".todo-input");

  const text = input.value;

  if (text !== "") {
    addTodo(text);
    input.value = "";
  }
});
