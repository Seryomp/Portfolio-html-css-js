    const sections = document.querySelectorAll('.section');
    const menuItems = document.querySelectorAll('.menu-principal .element-menu');

    menuItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        // Cacher toutes les sections
        sections.forEach(sec => sec.classList.remove('section-actif'));

        // Afficher la section correspondante
        sections[index].classList.add('section-actif');

        // Mettre à jour l’état actif du menu
        menuItems.forEach(i => i.classList.remove('actif'));
        item.classList.add('actif');
      });
    });