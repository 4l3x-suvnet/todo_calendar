// TODO: Save theme to localstorage

document.querySelector("#colorMode").addEventListener('click', () => {
    
    var element = document.body;
    element.classList.toggle("light-mode");
    if(document.body.classList.contains("light-mode")) {
        setDataTheme("light-mode");
    }
    else {
       setDataTheme("dark-mode");
   }
});

function setDataTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }