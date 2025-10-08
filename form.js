document.addEventListener("DOMContentLoaded", () => {
    // --- Récupération des éléments ---
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const forgotForm = document.getElementById("forgot-form");
    const profileContainer = document.getElementById("profile-container");
    const profileAvatar = document.getElementById("profile-avatar");
    const profileUsername = document.getElementById("profile-username");
    const editUsernameBtn = document.getElementById("edit-username");
    const editAvatarBtn = document.getElementById("edit-avatar");
    const connectionOverlay = document.querySelector(".connection-overlay");
    const connectionPopup = document.querySelector(".connection");
    const btnConnection = document.querySelector(".co"); // Bouton "Connexion" sur la page

    // --- Gestion de l’ouverture de la popup ---
    btnConnection.addEventListener("click", () => {
        connectionOverlay.style.display = "block";
        connectionPopup.style.display = "block";
    });

    // --- Gestion de la fermeture de la popup ---
    document.querySelector(".close-btn").addEventListener("click", () => {
        connectionOverlay.style.display = "none";
        connectionPopup.style.display = "none";
    });

    // --- Changement d’onglets connexion / inscription / mot de passe oublié ---
    document.getElementById("login-tab").addEventListener("click", () => {
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
        forgotForm.classList.remove("active");
    });
    document.getElementById("register-tab").addEventListener("click", () => {
        loginForm.classList.remove("active");
        registerForm.classList.add("active");
        forgotForm.classList.remove("active");
    });
    document.getElementById("mot_de_passe_oublier").addEventListener("click", () => {
        loginForm.classList.remove("active");
        registerForm.classList.remove("active");
        forgotForm.classList.add("active");
    });

    // --- Connexion via AJAX ---
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Empêche le rechargement de page
        const formData = new FormData(loginForm);

        fetch("verification.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Masquer bouton connexion et popup
                btnConnection.style.display = "none";
                connectionOverlay.style.display = "none";
                connectionPopup.style.display = "none";

                // Afficher profil
                profileContainer.style.display = "flex";
                profileUsername.textContent = data.username;
                profileAvatar.src = `avatars/${data.avatar}`;
            } else {
                alert(data.message || "Erreur de connexion");
            }
        })
        .catch(err => {
            console.error(err);
            alert("Erreur serveur");
        });
    });

    // --- Modifier le pseudo ---
    editUsernameBtn.addEventListener("click", () => {
        const newUsername = prompt("Entrez votre nouveau pseudo :", profileUsername.textContent);
        if (!newUsername) return;

        const formData = new FormData();
        formData.append("new_username", newUsername);

        fetch("update_username.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                profileUsername.textContent = newUsername;
                alert("Pseudo mis à jour !");
            } else {
                alert(data.message || "Erreur lors de la mise à jour du pseudo");
            }
        })
        .catch(err => console.error(err));
    });

    // --- Modifier l’avatar ---
    editAvatarBtn.addEventListener("click", () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*"; // Seules images
        fileInput.click();

        fileInput.addEventListener("change", () => {
            const file = fileInput.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("avatar", file);

            fetch("update_avatar.php", {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    profileAvatar.src = `avatars/${data.avatar}?t=${new Date().getTime()}`; // Evite cache
                    alert("Avatar mis à jour !");
                } else {
                    alert(data.message || "Erreur lors de la mise à jour de l’avatar");
                }
            })
            .catch(err => console.error(err));
        });
    });
});
