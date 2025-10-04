const couleurs = ["#ed66ffff", "#fa0000ff", "#1d30d6ff", "#a200ffff", "#fcfcfcff"];// ici on liste les couleurs
  
  const fond = document.querySelector(".gif_1");//selectionne la class à colorer
  let index = 0; // on commence à la première couleur

  function changeFond() { //définition de la fonction "changefond"
    fond.style.backgroundColor = couleurs[index]; // selectionne une couleur de l'index et l'applique
    index++; // on passe à la couleur suivante
    if (index >= couleurs.length) index = 0; // retour au début apres derniere couleur
  }

 setInterval(changeFond, 1000); // changement toutes les 1 secondes