const DISCORD_ID = "1220339179032940556"; // remplace par ton ID Discord

// Fonction pour obtenir l'URL correcte de l'avatar
function getAvatarURL(user) {
  if (!user.avatar) {
    const defaultIndex = parseInt(user.discriminator) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
  }
  const isAnimated = user.avatar.startsWith("a_");
  const ext = isAnimated ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
}

// Connexion WebSocket Lanyard
const socket = new WebSocket('wss://api.lanyard.rest/socket');

socket.addEventListener('open', () => {
  console.log("WebSocket connecté !");
  socket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } }));
});

socket.addEventListener('message', (event) => {
  const payload = JSON.parse(event.data);

  if (payload.t === 'INIT_STATE' || payload.t === 'PRESENCE_UPDATE') {
    const data = payload.d;

    // Mettre à jour le DOM
    const avatarImg = document.querySelector('.avatar');

    if (avatarImg) avatarImg.src = getAvatarURL(data.discord_user);
    if (usernameDiv) usernameDiv.textContent = `${data.discord_user.username}#${data.discord_user.discriminator}`;

    if (activityDiv) {
      if (data.activities && data.activities.length > 0) {
        activityDiv.textContent = data.activities.map(a => a.details ? `${a.name} — ${a.details}` : a.name).join(', ');
      } else if (data.spotify) {
        activityDiv.textContent = `Écoute Spotify : ${data.spotify.song} par ${data.spotify.artist}`;
      } else {
        activityDiv.textContent = '';
      }
    }
  }

  // Répondre au ping pour garder la connexion ouverte
  if (payload.op === 1) {
    socket.send(JSON.stringify({ op: 1 }));
  }
});

socket.addEventListener('close', () => console.log("WebSocket fermé"));
socket.addEventListener('error', (err) => console.error("Erreur WebSocket :", err));