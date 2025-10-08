const apiUrl = "http://127.0.0.1:5000/random_character";

document.getElementById("newRound").addEventListener("click", async () => {
    const anime = document.getElementById("animeSelect").value;
    const mode = document.getElementById("modeSelect").value;

    const res = await fetch(`${apiUrl}?anime=${encodeURIComponent(anime)}&mode=${mode}`);
    const data = await res.json();

    if(data.error){
        alert(data.error);
        return;
    }

    document.getElementById("quiz").style.display = "block";
    document.getElementById("animeTitle").innerText = data.anime_title;
    document.getElementById("charImage").src = data.character.image;
    document.getElementById("result").innerText = "";

    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    data.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.innerText = choice;
        btn.onclick = () => {
            if ((mode === "name" && choice === data.character.name) ||
                (mode === "role" && choice === data.character.role)) {
                document.getElementById("result").innerText = "✅ Correct !";
            } else {
                document.getElementById("result").innerText = `❌ Faux ! C'était : ${data.character.name}`;
            }
        };
        choicesDiv.appendChild(btn);
    });
});

const gameSelect = document.getElementById("gameSelect");
const miniGames = document.querySelectorAll(".mini-game");

gameSelect.addEventListener("change", () => {
    const selected = gameSelect.value;
    miniGames.forEach(game => {
        game.style.display = (game.id === selected) ? "block" : "none";
    });
});
