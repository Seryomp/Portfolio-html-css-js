const modeSelect = document.getElementById("modeSelect");
const difficultySelect = document.getElementById("difficultySelect");

modeSelect.addEventListener("change", () => {
    if(modeSelect.value === "image"){
        difficultySelect.style.display = "block";
    } else {
        difficultySelect.style.display = "none";
    }
});

document.getElementById("newRound").addEventListener("click", async () => {
    const anime = animeInput.value.trim();
    const mode = modeSelect.value;
    const difficulty = difficultySelect.value;

    if(!anime){
        alert("Veuillez entrer un anime !");
        return;
    }

    const res = await fetch(`${apiUrl}?anime=${encodeURIComponent(anime)}&mode=name`);
    const data = await res.json();

    if(data.error){
        alert(data.error);
        return;
    }

    document.getElementById("quiz").style.display = "block";
    document.getElementById("animeTitle").innerText = data.anime_title;

    const charImg = document.getElementById("charImage");
    charImg.src = data.character.image;

    // Appliquer le flou selon la difficulté
    if(mode === "image"){
        let blur = "0px";
        if(difficulty === "moyen") blur = "5px";
        if(difficulty === "difficile") blur = "15px";
        charImg.style.filter = `blur(${blur})`;
    } else {
        charImg.style.filter = "blur(0px)";
    }

    document.getElementById("result").innerText = "";

    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    // Si mode image, le joueur devine le nom
    const answerMode = (mode === "image") ? "name" : mode;

    data.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.innerText = choice;
        btn.onclick = () => {
            if ((answerMode === "name" && choice === data.character.name) ||
                (answerMode === "role" && choice === data.character.role)) {
                document.getElementById("result").innerText = "✅ Correct !";
            } else {
                document.getElementById("result").innerText = `❌ Faux ! C'était : ${data.character.name}`;
            }
        };
        choicesDiv.appendChild(btn);
    });
});
