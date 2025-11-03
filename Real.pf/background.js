const container = document.getElementById('background-container');
let currentBackground = null;
let currentIndex = 0;

const backgrounds = [
    matrixBackground,
];

function changeBackground() {
    if(currentBackground && currentBackground.canvas){
        currentBackground.canvas.remove();
        if(currentBackground.interval) clearInterval(currentBackground.interval);
    }
    currentIndex = (currentIndex + 1) % backgrounds.length;
    currentBackground = backgrounds[currentIndex](container);
}

document.getElementById('change-bg-btn').addEventListener('click', changeBackground);

window.onload = () => {
    currentBackground = backgrounds[currentIndex](container);
};
