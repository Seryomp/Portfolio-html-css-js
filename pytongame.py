import subprocess
import time
import os
import random
import pyautogui

# Nom du fichier utilisé comme "interface" - Notepad ouvrira ce fichier
QUESTION_FILE = "question.txt"

# Paramètres de frappe "humaine"
BASE_DELAY = 0.02        # délai moyen entre chaque caractère
JITTER = 0.03            # variation aléatoire ajoutée au délai


def write_file_initial(text):
    """Écrit immédiatement le texte de départ dans le fichier (pour que Notepad ouvre un fichier existant)."""
    with open(QUESTION_FILE, "w", encoding="utf-8") as f:
        f.write(text)


def open_notepad():
    """Ouvre notepad avec le fichier QUESTION_FILE et retourne l'objet Popen."""
    # Utiliser notepad.exe avec le nom du fichier pour ouvrir directement
    proc = subprocess.Popen(["notepad.exe", QUESTION_FILE])
    # laisser le temps à la fenêtre de s'ouvrir et d'être active
    time.sleep(0.7)
    return proc


def human_type(text, base_delay=BASE_DELAY, jitter=JITTER):
    """
    Tape le texte caractère par caractère dans la fenêtre active.
    Utilise pyautogui.write ; la fenêtre Notepad doit être active.
    """
    for ch in text:
        pyautogui.write(ch)
        # délai un peu aléatoire pour paraître humain
        delay = base_delay + random.uniform(0, jitter)
        time.sleep(delay)


def bring_notepad_to_front_by_click():
    """
    Tentative simple pour s'assurer que Notepad est au premier plan :
    clique au centre de l'écran (utile si Notepad est au premier plan après ouverture).
    (Alternative plus précise nécessite pygetwindow, évitée ici.)
    """
    w, h = pyautogui.size()
    pyautogui.click(w//2, h//2)
    time.sleep(0.15)


def read_last_nonempty_line():
    """Lit la dernière ligne non vide du fichier (retourne vide si aucune)."""
    try:
        with open(QUESTION_FILE, "r", encoding="utf-8") as f:
            lines = [ln.strip() for ln in f.readlines() if ln.strip() != ""]
        if not lines:
            return ""
        return lines[-1].lower()
    except FileNotFoundError:
        return ""


def wait_for_valid_response(valid_options, notepad_proc):
    """
    Boucle jusqu'à obtenir une réponse valide.
    Si Notepad est fermé par l'utilisateur, on le ré-ouvre.
    """
    while True:
        last = read_last_nonempty_line()

        if last in valid_options:
            return last

        # si Notepad a été fermé (proc terminé), on le rouvre
        if notepad_proc.poll() is not None:
            notepad_proc = open_notepad()
            # on s'assure qu'il est au premier plan
            bring_notepad_to_front_by_click()

        time.sleep(0.8)  # attente avant nouvelle vérification


# -------------------------
# Scénario d'exemple
# -------------------------

def pose_et_tape_question(question_text, options):
    """
    Pose la question en la tapant dans Notepad, puis attend une réponse valide.
    options : liste de réponses valides (en minuscules), ex ['a','b']
    """
    # on prépare le fichier sur disque avec un contenu initial (pour que Notepad l'ouvre)
    initial = "...\n"  # placeholder pour éviter fichier vide
    write_file_initial(initial)

    # ouvre notepad (ou le réutilise)
    proc = open_notepad()
    time.sleep(0.2)
    bring_notepad_to_front_by_click()

    # taper la question comme un humain
    human_type(question_text + "\n\n")
    human_type("Choix : " + " / ".join([o.upper() for o in options]) + "\n\n")
    human_type("Écris ta réponse (ex : " + options[0].upper() + ") puis enregistre (Ctrl+S).\n")

    # si c'est la première fois, demander d'enregistrer - simuler Ctrl+S pour aider l'utilisateur
    time.sleep(0.4)
    pyautogui.hotkey('ctrl', 's')
    time.sleep(0.4)
    # si la boîte "Enregistrer sous" apparaît, Notepad attend un nom ; on écrit le nom puis Enter
    # (Si le fichier existait déjà, il se contente d'enregistrer.)
    # On essaie d'écrire le nom du fichier - mais si Notepad a déjà enregistré, ceci écrira dans le contenu ; c'est ok.
    pyautogui.write(QUESTION_FILE)
    pyautogui.press('enter')
    time.sleep(0.4)

    # attendre la réponse valide
    rep = wait_for_valid_response(options, proc)
    return rep


def question_1():
    q = (
        "Sais tu qui je suis.\n"
        "en tant que personne distinct.\n\n"
    )
    return pose_et_tape_question(q, ["oui", "non"])


def question_2():
    q = (
        "Tu allumes la lumière. Une silhouette se dessine près de la porte.\n\n"
    )
    return pose_et_tape_question(q, ["a", "b"])


def fin_bonne():
    q = "Tu as trouvé la sortie. Bravo.\n\nÉcris OK et enregistre pour quitter.\n"
    return pose_et_tape_question(q, ["ok"])


def fin_mauvaise():
    q = "Une erreur fatale... Le jeu se termine ici.\n\nÉcris OK et enregistre pour quitter.\n"
    return pose_et_tape_question(q, ["ok"])


def main():
    # Exemple de logique simple
    r1 = question_1()
    if r1 == "a":
        r2 = question_2()
        if r2 == "a":
            fin_bonne()
        else:
            fin_mauvaise()
    else:
        fin_mauvaise()

    # Le programme termine proprement -> l'utilisateur peut fermer depuis le Gestionnaire des tâches s'il le souhaite.
    print("Fin du scénario.")


if __name__ == "__main__":
    main()
