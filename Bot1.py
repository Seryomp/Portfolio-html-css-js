import os
import discord
from discord.ext import commands
from flask import Flask, jsonify
import threading
from dotenv import load_dotenv

load_dotenv(dotenv_path="C:\Users\solar\Documents\GitHub\Portfolio-html-css-js\secret")

TOKEN = os.getenv("DISCORD_TOKEN")
GUILD_ID = int(os.getenv("SERVER_ID"))

intents = discord.Intents.default()
intents.members = True
intents.presences = True

bot = commands.Bot(command_prefix="!", intents=intents)
app = Flask(__name__)

@app.route("/members")
def get_members():
    guild = bot.get_guild(GUILD_ID)
    if not guild:
        return jsonify({"error": "Guild not found"}), 404

    en_ligne = []
    hors_ligne = []

    for member in guild.members:
        if member.bot:
            continue
        data = {
            "name": member.display_name,
            "avatar": str(member.avatar.url) if member.avatar else str(member.default_avatar.url),
            "status": str(member.status)
        }
        if str(member.status) == "offline":
            hors_ligne.append(data)
        else:
            en_ligne.append(data)

    return jsonify({
        "en_ligne": en_ligne,
        "hors_ligne": hors_ligne
    })

def run_flask():
    app.run(host="0.0.0.0", port=5000)

@bot.event
async def on_ready():
    print(f"{bot.user} est connecté.")

threading.Thread(target=run_flask).start()

bot.run(TOKEN)
