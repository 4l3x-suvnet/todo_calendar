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

  addTodo(formProps.title, formProps.description, formProps.date, formProps.time);
}

function renderAllTodo() {
  todoItems.forEach(todo => {
    renderTodo(todo)
  });
}

function renderTodo(todo) {
  const list = document.querySelector(".todo-list");

  console.log("todo");
  console.log(todo);


  // Create the <div class = todo-date-container>
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("todo-date-container");

  // Create the todo-date div
  const dateItem = document.createElement("div");
  dateItem.classList.add("todo-date");
  dateItem.innerHTML = todo.date;
  //Add date to big container
  itemContainer.append(dateItem);

  //Create the Todo Container ( container in the container  :) )
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("todo-container");

  // Create Subcontainer
  const detailsSubContainer = document.createElement("div");
  detailsSubContainer.classList.add("todo-subcontainer");

  //Create and Add Title
  const title = document.createElement("div");
  title.classList.add("todo-title");
  title.innerHTML = todo.title;

  detailsSubContainer.append(title);

  //Create button holder
  const actionsContainer = document.createElement("div");
  actionsContainer.classList.add("todo-actions");

  // Create and Add Buttons
  const editButton = document.createElement("i");
  editButton.classList.add("far");
  editButton.classList.add("fa-edit");
  //TODO editButton.addEventListener("click", () => editTodo(itemContainer, todo));

  const doneButton = document.createElement("i");
  doneButton.classList.add("fa-solid");
  doneButton.classList.add("fa-check");
  doneButton.addEventListener("click", () => removeTodo(itemContainer, todo));

  const removeButton = document.createElement("i");
  removeButton.classList.add("fa-regular");
  removeButton.classList.add("fa-trash-can");
  removeButton.addEventListener("click", () => removeTodo(itemContainer, todo));

  actionsContainer.append(editButton);
  actionsContainer.append(doneButton);
  actionsContainer.append(removeButton);

  //Add actions to subcontainer 
  detailsSubContainer.append(actionsContainer);

  // Create Description
  const descriptionItem = document.createElement("div");
  descriptionItem.classList.add("todo-desc");
  descriptionItem.innerHTML = todo.description;

  // Add Desc and subcontainer
  detailsContainer.append(detailsSubContainer);
  detailsContainer.append(descriptionItem);

  itemContainer.append(detailsContainer);

  list.append(itemContainer);
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

document.addEventListener("click", (getTodosFromADate) => {
  const selectedDay = document.querySelector(".selectedDay");
  let items = JSON.parse(localStorage.getItem("todoItems"));
  document.getElementById("selectedDate").innerHTML = selectedDay.id;

    items.forEach(function(todo) {
      if(todo.date == selectedDay.id) { 
        document.getElementById("todoTitle").innerHTML += todo.title;
        document.getElementById("todo-description").innerHTML += todo.description;
      }
      else {
        document.getElementById("todoTitle").innerHTML = "";
        document.getElementById("todo-description").innerHTML = "";
      }
    });
  });