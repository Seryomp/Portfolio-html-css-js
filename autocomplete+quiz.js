const animeInput = document.getElementById("animeInput");
const datalist = document.getElementById("animeSuggestions");

// Autocomplete anime via Jikan
animeInput.addEventListener("input", async () => {
    const query = animeInput.value;
    if (query.length < 2) return; // commencer après 2 lettres

    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=10`);
    const data = await res.json();
    datalist.innerHTML = "";
    data.data.forEach(anime => {
        const option = document.createElement("option");
        option.value = anime.title;
        datalist.appendChild(option);
    });
});

const apiUrl = "http://127.0.0.1:5000/random_character";

document.getElementById("newRound").addEventListener("click", async () => {
    const anime = animeInput.value.trim();
    const mode = document.getElementById("modeSelect").value;

    if(!anime){
        alert("Veuillez entrer un anime !");
        return;
    }

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
