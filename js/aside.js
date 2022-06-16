document.addEventListener("DOMContentLoaded", main);

function main() {
  renderDay();
}

function renderDay() {
  let weekday = getWeekDay();
  const date = new Date();

  const asidedateItem = document.querySelector(".aside-header");

  const dateText =
    date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const paddedHours = hours <= 9 ? "0" + hours : hours;
  const paddedMinutes = minutes <= 9 ? "0" + minutes : minutes;

  const timeText = paddedHours + ":" + paddedMinutes;

  const dayItem = asidedateItem.getElementsByTagName("h3");
  const dateItem = asidedateItem.getElementsByTagName("h4");

  dayItem[0].innerHTML = weekday + " " + timeText;
  dateItem[0].innerHTML = dateText;

  // For "live update"
  let t = setTimeout(function () {
    renderDay();
  }, 1000);
}

function getWeekDay() {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();

  let day = weekday[date.getDay()];

  return day;
}

document
  .querySelector(".aside-Content-Container")
  .addEventListener("click", (e) => {
    renderCalendar(getAndRefreshCalendarDate());
  });