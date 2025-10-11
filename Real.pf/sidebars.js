// ----------------- Fond Matrix principal -----------------
const container = document.getElementById('background-container');

function matrixBackground(container) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const letters = "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const interval = setInterval(() => {
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px monospace";

        drops.forEach((y, i) => {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, y * fontSize);
            drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
        });
    }, 33);

    return {canvas, interval};
}

const activeMatrix = matrixBackground(container);

window.addEventListener('resize', () => {
    if (activeMatrix.canvas) {
        activeMatrix.canvas.width = container.clientWidth;
        activeMatrix.canvas.height = container.clientHeight;
    }
});

// ----------------- Gestion des onglets -----------------
const menuElements = document.querySelectorAll('.menu-principal .element-menu');
const sections = document.querySelectorAll('.onglet-contenu');

menuElements.forEach(el => {
    el.addEventListener('click', () => {
        menuElements.forEach(e => e.classList.remove('actif'));
        el.classList.add('actif');

        sections.forEach(sec => sec.style.display = 'none');

        const text = el.innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        switch (text) {
            case 'accueil': document.getElementById('accueil').style.display = 'block'; break;
            case 'presentation': document.getElementById('presentation').style.display = 'block'; break;
            case 'diplome': document.getElementById('diplome').style.display = 'block'; break;
            case 'connaissance': document.getElementById('connaissance').style.display = 'block'; break;
            case 'experiences': document.getElementById('experiences').style.display = 'block'; break;
            case 'jeux': document.getElementById('jeux').style.display = 'block'; break;
            case 'error 404': document.getElementById('glitch-tab').style.display = 'block'; break;
            case 'ultima ▉▉▉▉▉▉▉': document.getElementById('ultima-tab').style.display = 'block'; break;
        }
    });
});
