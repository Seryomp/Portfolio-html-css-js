const dialogue = [
    "Bienvenue sur le site du shop en ligne de []",
    "Cet endroit est encore en construction",
    "Reviens plus tard"
];

function typeWriter(text, element, speed = 35) {
    let index = 0;
    return new Promise(resolve => {
        function step() {
            if (index < text.length) {
                element.textContent += text.charAt(index++);
                setTimeout(step, speed);
            } else {
                resolve();
            }
        }
        step();
    });
}

document.getElementById("shopentry").addEventListener("click", async () => {
    const terminal = document.getElementById("terminal");
    
    terminal.textContent = ""; // reset
    
    for (const line of dialogue) {
        await typeWriter(line + "\n", terminal, 35);
        await new Promise(r => setTimeout(r, 300)); // pause entre les lignes
    }
});
