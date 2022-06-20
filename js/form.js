function closeForm() {
  document.querySelector(".form-popup").style.display = "none";
  const fadeDiv = document.querySelector(".modal-fade");
  fadeDiv.remove();
}

function openForm(todo = null) {
  const submitFormButton = document.querySelector(".submitTodo");
  const doc = document.querySelector(".form-popup");
  doc.style.display = "block";

  const main = document.querySelector(".content-container");
  const fadeDiv = document.createElement("div");
  fadeDiv.classList.add("modal-fade");
  main.append(fadeDiv);

  const form = doc.firstChild.nextSibling;
  const elements = form.elements;

  // is Add
  if (todo == null) {
    submitFormButton.innerHTML = "Submit";

    elements["date"].value = selectedDayId;
    elements["time"].value = null;
    elements["title"].value = null;
    elements["description"].value = null;

    toDoForm.onsubmit = handleFormSubmit;
  }
  // is Edit
  else {
    submitFormButton.innerHTML = "Save";
    // Set values to prev values
    elements["date"].value = todo.date;
    elements["time"].value = todo.todoTime;
    elements["title"].value = todo.title;
    elements["description"].value = todo.description;
    alterId = todo.id;

    toDoForm.onsubmit = handleEditFormSubmit;
  }
}