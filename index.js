const info = document.querySelector(".info");
const cellules = document.querySelectorAll(".cell");
const main = document.querySelector("main");
const btnRejouer = document.querySelector(".btn-rejouer");

let verrouillage = true,
  joueurHumain = "X",
  joueurOrdinateur = "O";


info.innerHTML = `Au tour de ${joueurHumain}`;

const alignementsGagnants = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let partieEnCours = ["", "", "", "", "", "", "", "", ""];

cellules.forEach((cell) => {
  cell.addEventListener("click", clicSurCase);
});

function clicSurCase(e) {
  if (!verrouillage) {
    return;
  }

  const caseClique = e.target;
  const caseIndex = caseClique.getAttribute("data-index");

  if (partieEnCours[caseIndex] !== "") {
    return;
  }

  // Tour du joueur humain
  jouerCase(caseIndex, joueurHumain);
  
  // Vérification de la fin de partie après le coup du joueur
  validationResultats();

  // Si la partie n'est pas finie, c'est au tour de l'ordinateur
  if (verrouillage) {
    setTimeout(tourOrdinateur, 500); // Délai avant que l'ordinateur joue (0.5 secondes)
  }
}

function tourOrdinateur() {
  if (!verrouillage) {
    return;
  }

  // Choix aléatoire d'une case vide pour l'ordinateur
  let caseAleatoire;
  let caseVideTrouvee = false;

  // Recherche d'une case vide
  do {
    caseAleatoire = Math.floor(Math.random() * 9); // Génère un nombre aléatoire entre 0 et 8
    console.log("Case aléatoire choisie :", caseAleatoire);
    console.log("État actuel de partieEnCours :", partieEnCours);

    if (partieEnCours[caseAleatoire] === "") {
      caseVideTrouvee = true;
    }
  } while (!caseVideTrouvee);

  // Tour de l'ordinateur
  jouerCase(caseAleatoire, joueurOrdinateur);

  // Vérification de la fin de partie après le coup de l'ordinateur
  validationResultats();
}

function jouerCase(index, joueur) {
  partieEnCours[index] = joueur;
  cellules[index].innerHTML = joueur;
}

function validationResultats() {
  let finDePartie = false;
  let alignementGagnant = null;

  for (let i = 0; i < alignementsGagnants.length; i++) {
    const alignement = alignementsGagnants[i];
    let a = partieEnCours[alignement[0]];
    let b = partieEnCours[alignement[1]];
    let c = partieEnCours[alignement[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      finDePartie = true;
      alignementGagnant = alignement; // Assigner l'alignement gagnant trouvé
      break;
    }
  }

  if (finDePartie && alignementGagnant !== null) {
    main.style.minHeight = "610px";
    info.innerText = `Le joueur ${partieEnCours[alignementGagnant[0]]} a gagné`;
    info.style.color = "springgreen";
    verrouillage = false;
    btnRejouer.style.display = "block";
    return;
  }

  let matchNul = !partieEnCours.includes("");
  if (matchNul) {
    main.style.minHeight = "560px";
    info.innerText = `Match nul`;
    info.style.color = "red";
    btnRejouer.style.display = "block";
    return;
  }

  changementDeJoueur();
}


function changementDeJoueur() {
  // Aucun changement de joueur nécessaire dans ce cas
}

btnRejouer.addEventListener("click", () => {
  location.reload();
});
