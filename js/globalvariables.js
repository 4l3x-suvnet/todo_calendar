/* calendar variable globals */
let date = new Date();
const maxDays = 42;
let navigateMonth = date.getMonth();
let selectedDay;
let selectedDayId;

/* colormode globals */
let theme;

/* todos globals variables */
const openFormButton = document.querySelector(".add");
const descriptionButton = document.querySelector(".todo-container");
const closeFormButton = document.querySelector(".closeTodoForm");
const toDoForm = document.querySelector("#todo-form");
let alterId = null;

/* weather global variables */
const defaultCity = "Stockholm";
