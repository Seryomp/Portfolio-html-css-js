function updateAge() {
    const birthDate = new Date("2007-11-24"); // Remplace par ta date de naissance YYYY-MM-DD
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Si l'anniversaire n'est pas encore passé cette année
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    document.getElementById("age").textContent = age;
}

// Mise à jour au chargement de la page
window.addEventListener('load', updateAge);
