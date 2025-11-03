document.createElement("button")
Button.id = "co"
Button.widith = 150
Button.height = 200
Button.style.backgroundColor = "#ffff"
Button.style.display = "block"


// On récupère la div qui s'affiche avec le menu
let jeuxDiv = document.getElementById('jeux');

document.createElement("canvas")
canvas.id = "jeux_SL";
canvas.widith = 800;
canvas.height = 600;

canvas.style.border = "3px solid white"
canvas.style.backgroundColor = "#222";
canvas.style.display = "block";

jeuxDiv.appendChild(canvas);