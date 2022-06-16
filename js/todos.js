document.addEventListener("DOMContentLoaded", main);

const openFormButton = document.querySelector(".add");
const closeFormButton = document.querySelector(".closeTodoForm");
const toDoForm = document.querySelector("#todo-form");
let idCounter = 1;

let todoItems = JSON.parse(localStorage.getItem("todoItems"));
if (!todoItems) {
  todoItems = [];
}

function main() {
  bindEventHandlers();
}

function bindEventHandlers() {
  toDoForm.onsubmit = handleFormSubmit;
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  addTodo(formProps.title, formProps.description);
}

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
  closeForm();
}

openFormButton.addEventListener("click", () => {
  openForm();
});

closeFormButton.addEventListener("click", () => {
  closeForm();
});

function closeForm() {
  document.querySelector(".form-popup").style.display = "none";
}

function openForm() {
  document.querySelector(".form-popup").style.display = "block";
}
