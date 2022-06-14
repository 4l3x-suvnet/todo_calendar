const date = new Date();

// Sätter första datumet i månaden till 1
date.setDate(1);

const renderCalendar = () => {
  const month = date.getMonth();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); 
  const monthDays = document.querySelector(".calendar-grid");
  const firstDayIndex = date.getDay();
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const nextDays = 7 - lastDayIndex - 1;

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

  let daysOfMonth = document.querySelector(".calendar-grid");
  daysOfMonth.innerHTML = "";

  // Loopar igenom föregående månads sista dagar för att fylla ut första veckan
  for(let x = firstDayIndex; x > 0; x--) {
    const dayX = document.createElement("div");
    dayX.classList.add("prev-date");
    dayX.innerHTML = prevLastDay - x + 1;
    monthDays.appendChild(dayX);
  }

  for(let i = 1; i <= lastDay; i++) {
    // Om dagens datum = dagens datum, skapa en today div
    if(i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
      const dayX = document.createElement("div");
      dayX.classList.add("today");
      dayX.innerHTML = i;
      monthDays.appendChild(dayX);
    }

    //  Annars, skapa div för vanlig dag
    else {
      const dayX = document.createElement("div");
      dayX.classList.add("normal-date");
      dayX.innerHTML = i;
      monthDays.appendChild(dayX);
    }
  }

    // Loopar igenom nästkommande månad för att fylla ut sista veckan i gridet
    for(let y = 1; y <= nextDays; y++) {
      const dayX = document.createElement('div');
      dayX.classList.add('next-date');
      dayX.innerHTML = y;
      monthDays.appendChild(dayX);
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

document.querySelector(".calendar-grid").addEventListener("click", (e) => {
  const Name = "selectedDay";

  if(e.target.classList.contains("calendar-grid") == false)
  {
    if(e.target.classList.contains(Name))
      e.target.classList.remove(Name)
    else
      e.target.classList.add(Name);
  }
});

renderCalendar();
