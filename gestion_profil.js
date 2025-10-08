document.addEventListener('DOMContentLoaded', () => {
    const editUsernameBtn = document.getElementById('edit-username');
    const profileUsername = document.getElementById('profile-username');
    const editAvatarBtn = document.getElementById('edit-avatar');
    const profileAvatar = document.getElementById('profile-avatar');

    // Modifier le pseudo
    editUsernameBtn.addEventListener('click', () => {
        const newUsername = prompt("Entrez votre nouveau pseudo :", profileUsername.textContent);
        if (!newUsername) return;

        const formData = new FormData();
        formData.append('username', newUsername);

        fetch('update_username.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) profileUsername.textContent = data.username;
            else alert(data.message);
        })
        .catch(err => console.error(err));
    });

    // Modifier l'avatar
    editAvatarBtn.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.click();

        fileInput.onchange = () => {
            const file = fileInput.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('avatar', file);

            fetch('update_avatar.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) profileAvatar.src = data.avatar; // met à jour l'image directement
                else alert(data.message);
            })
            .catch(err => console.error(err));
        };
    });
});
