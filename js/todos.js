document.addEventListener("DOMContentLoaded", main);

const openFormButton = document.querySelector(".add");
const descriptionButton = document.querySelector(".todo-container");
const closeFormButton = document.querySelector(".closeTodoForm");
const toDoForm = document.querySelector("#todo-form");

let todoItems = JSON.parse(localStorage.getItem("todoItems"));
if (!todoItems) {
  todoItems = [];
}

let idCounter =
  todoItems.length == 0 ? 0 : todoItems[todoItems.length - 1].id + 1;

function main() {
  bindEventHandlers();
  renderAllTodo();
}

function bindEventHandlers() {
  toDoForm.onsubmit = handleFormSubmit;
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  addTodo(
    formProps.title,
    formProps.description,
    formProps.date,
    formProps.time
  );
}

let alterId = null;
function handleEditFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  alterTodo(
    alterId,
    formProps.title,
    formProps.description,
    formProps.date,
    formProps.time
  );
}

function renderAllTodo(selectedDate = null) {
  const allExistingTodos = document.querySelectorAll(".todo-date-container");
  allExistingTodos.forEach((todo) => {
    todo.remove();
  });

  if (selectedDate == null) {
    todoItems.forEach((todo) => {
      renderTodo(todo);
    });
  } else {
    todoItems.forEach((todo) => {
      if (todo.date === selectedDate) {
        renderTodo(todo);
      }
    });
  }

  counterTodosPerDate();
}

function renderTodo(todo) {
  const list = document.querySelector(".todo-list");

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
  editButton.addEventListener("click", () => editTodo(todo));

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

  itemContainer.addEventListener("click", (e) => ToggleTodoDescription(descriptionItem, e));

  list.append(itemContainer);
}

function removeTodo(itemContainer, todo) {
  itemContainer.parentNode.removeChild(itemContainer);
  let todoIndex = todoItems.indexOf(todo);
  todoItems.splice(todoIndex, 1);
  window.localStorage.setItem("todoItems", JSON.stringify(todoItems));

  counterTodosPerDate();
}

function addTodo(title, description, date = selectedDayId, todoTime) {
  const todo = {
    title,
    description,
    id: idCounter,
    date,
    todoTime,
  };
  idCounter++;
  todoItems.push(todo);

  sortTodoList();
  window.localStorage.setItem("todoItems", JSON.stringify(todoItems));
  renderAllTodo(selectedDayId);

  closeForm();
}

function alterTodo(id, title, description, date, todoTime) {
  const itemToChange = todoItems.find((x) => x.id === id);

  itemToChange.title = title;
  itemToChange.description = description;
  itemToChange.date = date;
  itemToChange.todoTime = todoTime;

  sortTodoList();
  window.localStorage.setItem("todoItems", JSON.stringify(todoItems));
  renderAllTodo(selectedDayId);

  closeForm();
}

//TODO perhaps remove
function editTodo(todo) {
  openForm(todo);
}

// i swear prettier is ruining this readability.
function sortTodoList() {
  todoItems.sort((a, b) =>
    a.date > b.date
      ? 1
      : a.date === b.date
      ? a.todoTime > b.todoTime
        ? 1
        : -1
      : -1
  );
}

// let extendedTodo;
// function ToggleTodoDescription(e) {
//   const desc = document.getElementsByClassName("todo-desc");
//   const sameTodo = e.target === extendedTodo;

//   for (let index = 0; index < desc.length; index++) {

//     if(e.target === desc[index])
//     {
//       if(extendedTodo)
//       {
//         extendedTodo.classList.remove("extended");
//         extendedTodo = undefined;
//       }

//       if(!sameTodo)
//       {
//         extendedTodo = e.target;
//         e.target.classList.add("extended");
//       }
//     }
//   }
// }

function ToggleTodoDescription(obj, e) {
  // check if it's already extended.
  if(obj.classList.contains("extended"))
  {
    //Check if the event was target @the desc div or just the whole container
    if(e.target.classList.contains("extended"))
    {
      return;
    }
    obj.classList.remove("extended")
  }
  else
  {
  //close all existing extended.
    const allDesc = document.getElementsByClassName("todo-desc");

    for(let i = 0; i < allDesc.length; i++)
      allDesc[i].classList.remove("extended");

    //Then add extended to correct.
    obj.classList.add("extended");
  }
}

openFormButton.addEventListener("click", () => {
  openForm();
});

closeFormButton.addEventListener("click", () => {
  closeForm();
});
