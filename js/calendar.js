const date = new Date();

// Sätter första datumet i månaden till 1
date.setDate(1);

const renderCalendar = () => {
  const month = date.getMonth();
  
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); 
  const monthDays = document.querySelector('.calendar-grid')

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

  let daysOfMonth = document.querySelector('.calendar-grid');
  daysOfMonth.innerHTML = '';
    
  for(let i = 1; i <= lastDay; i++) {
    // Om dagens datum = dagens datum, skapa en today div
    if(i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
      const dayX = document.createElement('div');
      dayX.classList.add('today');
      dayX.innerHTML = i;
      monthDays.appendChild(dayX);
    }

    //  Annars, skapa div för vanlig dag
    else {
      const dayX = document.createElement('div');
      dayX.classList.add('normal-date');
      dayX.innerHTML = i;
      monthDays.appendChild(dayX);
    }
  }
};

// Sätt nuvarande månad till navigeringsmånad, t ex juni = 5
let navigateMonth = date.getMonth();


// När man klickar vänsterpil så...
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

// När man klickar högerpil så...
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
