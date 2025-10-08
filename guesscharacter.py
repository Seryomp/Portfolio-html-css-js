import random
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

JIKAN_BASE = "https://api.jikan.moe/v4"

def get_random_character(anime_name, mode="name"):
    r = requests.get(f"{JIKAN_BASE}/anime", params={"q": anime_name, "limit": 1})
    r.raise_for_status()
    data = r.json().get("data", [])
    if not data:
        return {"error": "Anime not found"}

    anime = data[0]
    mal_id = anime["mal_id"]

    r2 = requests.get(f"{JIKAN_BASE}/anime/{mal_id}/characters")
    r2.raise_for_status()
    characters = r2.json().get("data", [])
    valid_chars = [c for c in characters if c.get("character") and c["character"].get("images")]
    if not valid_chars:
        return {"error": "No characters with images"}

    chosen = random.choice(valid_chars)
    char_info = {
        "anime_title": anime["title"],
        "character": {
            "name": chosen["character"]["name"],
            "image": chosen["character"]["images"]["jpg"]["image_url"],
            "role": chosen.get("role")
        },
        "mode": mode,
        "choices": random.sample(
            [c["character"]["name"] for c in valid_chars if c["character"]["name"] != chosen["character"]["name"]],
            k=min(3, len(valid_chars)-1)
        ) + [chosen["character"]["name"]]
    }
    random.shuffle(char_info["choices"])
    return char_info

@app.route("/random_character")
def random_character():
    anime_name = request.args.get("anime")
    mode = request.args.get("mode", "name")
    if not anime_name:
        return jsonify({"error": "Anime parameter required"}), 400
    return jsonify(get_random_character(anime_name, mode))

# Futurs endpoints pour d'autres mini-jeux
@app.route("/memory_game_data")
def memory_game_data():
    # Exemple pour futur jeu
    return jsonify({"message": "À implémenter"})

if __name__ == "__main__":
    app.run(debug=True)
