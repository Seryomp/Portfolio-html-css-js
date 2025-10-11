const glitchSpan = document.querySelector("#glitch span");
const originalText = glitchSpan.textContent;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function glitch() {
  let text = "";
  for (let i = 0; i < originalText.length; i++) {
    if (Math.random() < 0.3) { // 30% chance de changer le caractère
      text += letters[Math.floor(Math.random() * letters.length)];
    } else {
      text += originalText[i];
    }
  }
  glitchSpan.textContent = text;
}

// Faire glitcher toutes les 50ms
setInterval(glitch, 50);