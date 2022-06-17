document.addEventListener("DOMContentLoaded", main);

const openFormButton = document.querySelector(".add");
const closeFormButton = document.querySelector(".closeTodoForm");
const toDoForm = document.querySelector("#todo-form");

let todoItems = JSON.parse(localStorage.getItem("todoItems"));
if (!todoItems) {
  todoItems = [];
}

function main() {
  bindEventHandlers();
  renderAllTodo();
}

let idCounter = todoItems.length == 0 ? 0 : todoItems[todoItems.length - 1].id + 1;

function bindEventHandlers() {
  toDoForm.onsubmit = handleFormSubmit;
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  addTodo(formProps.title, formProps.description, formProps.Date, formProps.Time);
}

function renderAllTodo() {
  todoItems.forEach(todo => {
    renderTodo(todo)
  });
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

function addTodo(title, description, date = selectedDayId, todoTime) {
  const todo = {
    title,
    description,
    id: idCounter,
    date, 
    todoTime 
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
  const fadeDiv = document.querySelector(".modal-fade");
  fadeDiv.remove();
}

function openForm() {

  var doc = document.querySelector(".form-popup");
  doc.style.display = "block";
  
  const main = document.querySelector(".calendar");
  const fadeDiv = document.createElement('div');
  fadeDiv.classList.add("modal-fade");
  main.append(fadeDiv);
  
  // Find Date element
  var form = doc.firstChild.nextSibling;
  var elements = form.elements;
  var date = elements["date"];
  date.value = selectedDayId;
}
