// Liste des dialogues RPG
const dialogues = [
  "Bienvenue...",
  "j'avais prévu ton arrivée.",
  "Si tu est ici c'est que tu a réussi mon épreuve",
  "Tu peux cliquer sur les sections pour en savoir plus."
];

let currentDialogue = 0; // indice du dialogue actuel
let index = 0;           // indice de la lettre actuelle

const dialogueBox = document.getElementById('dialogue-box');
const dialogueElement = document.getElementById('dialogue');
const curseur = document.getElementById('curseur');

// Fonction pour afficher le texte lettre par lettre
function afficherTexte() {
  dialogueBox.style.display = 'block';
  if (index < dialogues[currentDialogue].length) {
    dialogueElement.textContent += dialogues[currentDialogue][index];
    index++;
    setTimeout(afficherTexte, 50); // vitesse du texte
  } else {
    curseur.style.display = 'block'; // fin du texte, montrer curseur
  }
}

// Clique pour passer au dialogue suivant
dialogueBox.addEventListener('click', () => {
  if (index < dialogues[currentDialogue].length) {
    // Si le texte n'est pas fini, on affiche tout d'un coup
    dialogueElement.textContent = dialogues[currentDialogue];
    index = dialogues[currentDialogue].length;
    curseur.style.display = 'block';
    return;
  }

  // Passer au dialogue suivant
  currentDialogue++;
  if (currentDialogue < dialogues.length) {
    dialogueElement.textContent = '';
    index = 0;
    curseur.style.display = 'none';
    afficherTexte();
  } else {
    // Tous les dialogues terminés, on peut cacher la boîte
    dialogueBox.style.display = 'none';
  }
});

// Lancer le premier dialogue quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
  afficherTexte();
});
