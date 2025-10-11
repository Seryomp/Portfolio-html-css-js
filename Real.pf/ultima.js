const tabUltima = document.getElementById("ultima");
const ultimaTab = document.getElementById("ultima-tab");
const consoleDiv = document.getElementById("console");
const input = document.getElementById("input-field");

const dialogue = [
  "Système Ultima de ▉▉▉ démarrage…",
  "Lieu restreint confidentielle.",
  "▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉",
  "Entrez 'start' pour continuer puis connectez-vous.",
    "▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉",
    "Aide: Contactez ▉▉▉ pour les identifiants.",
    "on dit que seul ▉▉▉ avait accès à cette endroit...",
];

let line = 0;
let started = false;

// Affiche le texte lettre par lettre
function typeLine(text, callback) {
  let i = 0;
  const lineDiv = document.createElement("div");
  consoleDiv.appendChild(lineDiv);

  function addChar() {
    if (i < text.length) {
      lineDiv.textContent += text[i];
      i++;
      setTimeout(addChar, 50); // vitesse des lettres
    } else if (callback) {
      callback();
    }
  }
  addChar();
}

// Affichage ligne par ligne
function showDialogue() {
  if (line < dialogue.length) {
    const isLast = line === dialogue.length - 1;
    let text = dialogue[line];
    if (isLast) text += "▉"; // curseur clignotant
    typeLine(text, () => {
      line++;
      setTimeout(showDialogue, 500);
    });
  } else {
    input.style.display = "block";
    input.focus();
  }
}

// Gestion du clic sur l'onglet Ultima
tabUltima.addEventListener("click", () => {
  if (!started) {
    started = true;
    // Afficher l'onglet et cacher les autres
    document.querySelectorAll(".onglet-contenu").forEach(c => c.style.display = "none");
    ultimaTab.style.display = "block";

    consoleDiv.innerHTML = "";      // réinitialise la console
    consoleDiv.style.display = "block";
    line = 0;
    showDialogue();
  }
});

// Champ start
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (input.value.toLowerCase() === "start") {
      input.style.display = "none";
      showLogin();
    } else {
      typeLine("Commande inconnue.");
      input.value = "";
    }
  }
});

// Fonction login
function showLogin() {
  consoleDiv.innerHTML = "";

  const userInput = document.createElement("input");
  userInput.placeholder = "Nom d'utilisateur";
  userInput.id = "username";
  userInput.style.background = "#14b1b1ff";
  userInput.style.color = "rgba(0, 0, 0, 1)";
  userInput.style.border = "1px solid rgba(255, 251, 251, 1)";
  userInput.style.marginBottom = "4px";

  const passInput = document.createElement("input");
  passInput.type = "password";
  passInput.placeholder = "Mot de passe";
  passInput.id = "password";
  passInput.style.background = "#1cc7b0ff";
  passInput.style.color = "rgba(0, 0, 0, 1)";
  passInput.style.border = "1px solid rgba(255, 255, 255, 1)";
  passInput.style.marginBottom = "4px";

  const btn = document.createElement("button");
  btn.textContent = "Ouvrir la session";
  btn.style.background = "#1fc2baff";
  btn.style.color = "rgba(0, 0, 0, 1)";
  btn.style.border = "1px solid rgba(255, 255, 255, 1)";
  btn.style.cursor = "pointer";

  const errorMsg = document.createElement("div");
  errorMsg.style.color = "red";
  errorMsg.id = "error";

  consoleDiv.appendChild(userInput);
  consoleDiv.appendChild(passInput);
  consoleDiv.appendChild(btn);
  consoleDiv.appendChild(errorMsg);

  const storedUser = "Ryo";
  const storedPass = "1234";

  btn.addEventListener("click", () => {
    if (userInput.value === storedUser && passInput.value === storedPass) {
      consoleDiv.innerHTML = "";
      typeLine("Session ouverte. Bienvenue, " + storedUser + ".▉");
    } else {
      errorMsg.textContent = "Identifiants incorrects.";
    }
  });
}