// ===================== CLASSES =====================

// Classe pour gérer un dialogue avec personnage
class Dialogue {
    constructor(lines, callback, characterImg = null) {
        this.lines = lines;             // tableau de phrases à afficher
        this.callback = callback;       // fonction à exécuter à la fin du dialogue
        this.characterImg = characterImg; // image du personnage au-dessus
        this.index = 0;                 // indice de la ligne actuelle
        this.createDialogue();          // crée le dialogue à l'affichage
    }

    // Crée le conteneur et la boîte de dialogue
    createDialogue() {
        // Conteneur global pour dialogue + personnage
        this.container = document.createElement('div');
        this.container.classList.add('dialogue-container');
        this.container.style.position = 'fixed';
        this.container.style.bottom = '50px';
        this.container.style.left = '50%';
        this.container.style.transform = 'translateX(-50%)';
        this.container.style.zIndex = '200';
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'column';
        this.container.style.alignItems = 'center';
        document.body.appendChild(this.container);

        // Ajouter l'image du personnage si fournie
        if(this.characterImg) {
            this.charImg = document.createElement('img');
            this.charImg.src = this.characterImg;
            this.charImg.style.width = '100px';
            this.charImg.style.marginBottom = '10px';
            this.container.appendChild(this.charImg);
        }

        // Boîte de dialogue
        this.box = document.createElement('div');
        this.box.classList.add('dialogue-box');
        this.box.style.padding = '20px';
        this.box.style.background = 'rgba(0,0,0,0.85)';
        this.box.style.color = 'white';
        this.box.style.fontFamily = 'monospace';
        this.box.style.cursor = 'pointer';
        this.container.appendChild(this.box);

        // Afficher la première ligne
        this.box.innerText = this.lines[this.index];

        // Avancer le dialogue au clic
        this.box.addEventListener('click', () => this.nextLine());
    }

    // Passe à la ligne suivante ou termine
    nextLine() {
        this.index++;
        if(this.index < this.lines.length) {
            this.box.innerText = this.lines[this.index];
        } else {
            this.container.remove(); // supprime le dialogue
            if(this.callback) this.callback(); // lance la fonction suivante
        }
    }
}

// Classe pour le mini-jeu corrompu
class GlitchGame {
    constructor(callback) {
        this.callback = callback;
        this.corruption = 0;
        this.gameOver = false;

        // Position et vitesse du joueur
        this.player = {
            x: window.innerWidth / 2 - 15,
            y: window.innerHeight - 60,
            width: 30,
            height: 30,
            speed: 3 // vitesse initiale
        };

        this.keys = {}; // touches pressées

        this.createCanvas();
        this.addControls();
        this.loop();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('game-canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = 0;
        this.canvas.style.left = 0;
        this.canvas.style.zIndex = 150;
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
    }

    addControls() {
        window.addEventListener('keydown', (e) => { this.keys[e.key.toLowerCase()] = true; });
        window.addEventListener('keyup', (e) => { this.keys[e.key.toLowerCase()] = false; });
    }

    updatePlayer() {
        // Déplacements avec touches ZQSD/WASD
        if(this.keys['z'] || this.keys['w']) this.player.y -= this.player.speed;
        if(this.keys['s']) this.player.y += this.player.speed;
        if(this.keys['q'] || this.keys['a']) this.player.x -= this.player.speed;
        if(this.keys['d']) this.player.x += this.player.speed;

        // Limiter le joueur à l’écran
        this.player.x = Math.max(0, Math.min(this.player.x, this.canvas.width - this.player.width));
        this.player.y = Math.max(0, Math.min(this.player.y, this.canvas.height - this.player.height));
    }

    loop() {
        if(this.gameOver) return;

        // Fond noir
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Mise à jour du joueur
        this.updatePlayer();

        // Dessin du joueur
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

        // Corruption progressive
        // On augmente la vitesse de corruption avec le temps
        this.corruption += 0.002 + this.corruption * 0.01; // plus ça avance, plus ça va vite
        this.ctx.fillStyle = `rgba(155, 0, 155, ${this.corruption})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Augmentation progressive de la vitesse du joueur
        this.player.speed = 3 + this.corruption * 10; // commence à 3px et accélère

        // Fin du jeu
        if(this.corruption >= 1) {
            this.gameOver = true;
            this.canvas.remove();
            if(this.callback) this.callback();
            return;
        }

        requestAnimationFrame(() => this.loop());
    }
}


// ===================== FONCTIONS =====================

// Dialogue final après défaite
function endDialogue() {
    new Dialogue(
        [
            "Tout est perdu…",
            "Mais… une faille s’ouvre…"
        ],
        () => {
            // Transformation de l'onglet "error 404"
            const glitch = document.getElementById('glitch');
            glitch.innerHTML = '<i class="fa-solid fa-skull-crossbones"></i><span>Une faille</span>';
            glitch.style.color = 'purple';
            glitch.style.pointerEvents = 'none'; // plus cliquable
        },
        'images/personnage.png' // image du personnage
    );
}

// Début de l’arc sur clic de l’onglet error 404
const errorMenu = document.getElementById('glitch');

errorMenu.addEventListener('click', () => {
    // Premier dialogue
    new Dialogue(
        [
            "…Tu es arrivé ici…",
            "Tu aurais peut-être pas dû…",
            "Prépare-toi…"
        ],
        () => new GlitchGame(endDialogue), // lance mini-jeu après le dialogue
        'images/personnage.png' // image du personnage
    );
});
