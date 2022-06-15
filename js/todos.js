let todoItems = JSON.parse(localStorage.getItem("todoItems"));
if (!todoItems) {
  todoItems = [];
}

const add = document.querySelector(".add");
let idCounter = 1;

function renderTodo(todo) {
  const list = document.querySelector(".todo-list");
  const itemContainer = document.createElement("div");
  const item = document.createElement("div");
  const remove = document.createElement("button");

  itemContainer.classList.add("item-container");
  item.classList.add("item");

  item.innerHTML = todo.title;
  item.innerHTML += todo.description;
  remove.innerHTML = "Remove";

  list.append(itemContainer);
  itemContainer.append(item);
  itemContainer.append(remove);

  remove.addEventListener("click", () => removeTodo(itemContainer, todo));
}

function removeTodo(itemContainer, todo) {
  itemContainer.parentNode.removeChild(itemContainer);
  let todoIndex = todoItems.indexOf(todo);
  todoItems.splice(todoIndex, 1);
  window.localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

function addTodo(title, description) {
  const todo = {
    title,
    description,
    id: idCounter,
    date: new Date().toLocaleDateString(),
    todoTime: new Date().toLocaleTimeString(),
  };
  idCounter++;
  todoItems.push(todo);
  window.localStorage.setItem("todoItems", JSON.stringify(todoItems));
  renderTodo(todo);
  console.log(todo); //Just during development phase
}

add.addEventListener("click", () => {
  const inputTitle = document.querySelector(".todo-input-title");
  const inputDesc = document.querySelector(".todo-input-desc");

  const title = inputTitle.value;
  const desc = inputDesc.value;

  if (title !== "") {
    addTodo(title, desc);
    inputTitle.value = "";
    inputDesc.value = "";
  }
});
