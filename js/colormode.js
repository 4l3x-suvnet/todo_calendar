// TODO: Save button state to local storage
let theme = JSON.parse(localStorage.getItem("data-theme"));

if (!theme) theme = 'dark-mode';

document.querySelector("#colorMode").addEventListener('click', () => {
    
    var element = document.body;
    element.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")) setDataTheme("light-mode");
    else setDataTheme("dark-mode");

});

function setDataTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", JSON.stringify(theme));
  }

