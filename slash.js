function playSlashEffect() {
  const slashSound = document.getElementById('slashSound');
  if (!slashSound) {
    console.warn("⚠️ Fichier audio introuvable !");
    return;
  }

  // Overlay noir progressif
  const overlay = document.createElement('div');
  overlay.id = 'sukunaOverlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'black',
    opacity: '0',
    zIndex: '9999',
    transition: 'opacity 2s ease-in'
  });
  document.body.appendChild(overlay);

  // Slashs synchronisés
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const slash = document.createElement('div');
      slash.classList.add('slash');
      slash.style.transform = `rotate(${(Math.random() * 40) - 20}deg)`;
      document.body.appendChild(slash);

      slashSound.currentTime = 0;
      slashSound.play().catch(() => {});
      setTimeout(() => slash.remove(), 600);
    }, i * 300);
  }

  // Apparition du noir
  setTimeout(() => (overlay.style.opacity = '1'), 1000);

  // Redirection après l'effet
  setTimeout(() => {
    overlay.remove();
    window.location.href = "Portfolio.html";
  }, 3000);
}
