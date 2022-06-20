// TODO: Save button state to local storage
let theme = JSON.parse(localStorage.getItem("data-theme"));

changeModeByChecked();

if (!theme) theme = 'dark-mode';
document.getElementById("colorMode").addEventListener('click', () => {
    
    var element = document.body;
    element.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")) setDataTheme("dark-mode");
    else setDataTheme("light-mode");

});

function setDataTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", JSON.stringify(theme));
  }

  function changeModeByChecked(){
    if(theme === 'light-mode') {
        document.getElementById("colorMode").checked = false;
    }
    else {
        document.getElementById("colorMode").checked = true;
    } 
  }

