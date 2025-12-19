const userId = "1220339179032940556";

fetch(`https://api.lanyard.rest/v1/users/${userId}`)
  .then(r => r.json())
  .then(({ data }) => {
    const u = data.discord_user;
    const ext = u.avatar.startsWith("a_") ? "gif" : "png";  // animé ou non
    document.getElementById("pfp").src =
      `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.${ext}?size=1024`;
  });