async function getHolidays() {
  const url = "https://sholiday.faboul.se/dagar/v2.1/";
  const holidays = fetch(`${url}${date.getFullYear()}/${navigateMonth + 1}`)
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
  return holidays;
}
