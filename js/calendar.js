const date = new Date();

const renderCalendar = () => {
  const month = date.getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  document.querySelector(".current-month").innerHTML =
    months[navigateMonth] + " " + date.getFullYear();
  console.log(month);
};

let navigateMonth = date.getMonth();

document.querySelector(".prev").addEventListener("click", () => {
  navigateMonth--;
  date.setMonth(navigateMonth);
  console.log(date.getFullYear());

  if (navigateMonth < 0) {
    navigateMonth = 11;
    console.log(navigateMonth);
  }

  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  navigateMonth++;
  date.setMonth(navigateMonth);
  console.log(date.getFullYear());

  if (navigateMonth > 11) {
    navigateMonth = 0;
    console.log(navigateMonth);
  }

  renderCalendar();
});

renderCalendar();
