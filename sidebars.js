const container = document.getElementById('background-container');
const btn = document.getElementById('change-bg-btn');

const backgrounds = ['matrix', 'sakura', 'solarSystem']; // galaxy remplacé par solarSystem
let current = 0;
let active = {canvas: null, interval: null};

function clearBackground() {
    // clearInterval seulement si défini
    if(active.interval) clearInterval(active.interval);
    if(active.canvas) active.canvas.remove();
}

function changeBackground() {
    clearBackground();
    const bg = backgrounds[current];
    current = (current + 1) % backgrounds.length;

    if(bg === 'matrix') active = matrixBackground(container);
    else if(bg === 'sakura') active = sakuraBackground(container);
    else if(bg === 'solarSystem') active = solarSystemBackground(container);
}

// Initialisation : Matrix
changeBackground();

// Bouton sidebar
btn.addEventListener('click', changeBackground);

// Redimensionnement
window.addEventListener('resize', () => {
    if(active.canvas){
        active.canvas.width = window.innerWidth;
        active.canvas.height = window.innerHeight;
    }
});

// ----------------- Éléments -----------------
const themeToggle = document.getElementById('theme-toggle');
const sidebar = document.querySelector('.barre-laterale');

// ----------------- Fonction pour appliquer le thème -----------------
function applyTheme(isDark) {
    if (isDark) sidebar.classList.add('sombre');
    else sidebar.classList.remove('sombre');
}

// ----------------- Événement sur le checkbox -----------------
themeToggle.addEventListener('change', () => {
    applyTheme(themeToggle.checked);
    localStorage.setItem('darkTheme', themeToggle.checked); // garder la préférence
});

// ----------------- Au chargement de la page -----------------
window.addEventListener('load', () => {
    const storedTheme = localStorage.getItem('darkTheme');
    if(storedTheme !== null){
        const isDark = storedTheme === 'true';
        themeToggle.checked = isDark;
        applyTheme(isDark);
    } else {
        applyTheme(themeToggle.checked);
    }
});

const menuElements = document.querySelectorAll('.menu-principal .element-menu');
menuElements.forEach(el => {
  el.addEventListener('click', () => {
    menuElements.forEach(e => e.classList.remove('actif'));
    el.classList.add('actif');

    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.style.display = 'none');

    switch(el.innerText.toLowerCase()) {
      case 'accueil':
        document.getElementById('accueil').style.display = 'block';
        break;
      case 'jeux':
        document.getElementById('jeux').style.display = 'block';
        break;
      // ajouter les autres onglets si nécessaire
      default:
        document.getElementById('accueil').style.display = 'block';
    }
  });
});

