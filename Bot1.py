import os
import discord
from discord.ext import commands
from flask import Flask, jsonify
import threading
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

TOKEN = os.getenv("DISCORD_TOKEN")       # mets ton token bot dans .env
SERVER_ID = int(os.getenv("SERVER_ID"))  # mets l'ID de ton serveur dans .env

intents = discord.Intents.default()
intents.members = True
intents.presences = True
bot = commands.Bot(command_prefix="!", intents=intents)

app = Flask(__name__)

@app.route("/online")
def online_members():
    guild = bot.get_guild(SERVER_ID)
    if guild is None:
        return jsonify({"error": "Serveur introuvable"}), 404

    members = [
        {
            "id": m.id,
            "username": m.name,
            "avatar": str(m.avatar.url) if m.avatar else None,
            "status": str(m.status)
        }
        for m in guild.members if m.status != discord.Status.offline
    ]
    return jsonify(members)

def run_flask():
    app.run(host="0.0.0.0", port=5000)

@bot.event
async def on_ready():
    print(f"✅ Connecté en tant que {bot.user}")
    # Lancer Flask dans un thread séparé
    thread = threading.Thread(target=run_flask, daemon=True)
    thread.start()

bot.run(TOKEN)
