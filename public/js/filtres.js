/*=============================================================
            FILTRES              
Role : 

--Afficher les cards en fonction des filtres

================================================================*/

// Récupérer tous les cards
const cards = document.querySelectorAll(".card");

// Récupérer les filtres (select et checkbox)
const filterVille = document.getElementById("filter-ville");
const filterCapacite = document.getElementById("filter-capacite");
const filterFibre = document.getElementById("filter-fibre");
const filterPMR = document.getElementById("filter-pmr");
const filter4K = document.getElementById("filter-4k");

function filtrerEspaces() {
  // Récupérer les valeurs des filtres
  const ville = filterVille.value;
  const capacite = filterCapacite.value;
  const fibre = filterFibre.checked;
  const pmr = filterPMR.checked;
  console.log("case PMR :", pmr);
  const ecran4K = filter4K.checked;

  // Parcourir tous les cards
  cards.forEach((card) => {
    console.log("test");
    // Récupérer les valeurs des cards
    const cardVille = card.dataset.ville;
    const cardCapacite = Number(card.dataset.capacite);
    console.log("cardCapacite", cardCapacite);
    const cardFibre = card.dataset.fibre === "true";
    const cardPMR = card.dataset.pmr === "true";
    //crocher pour echapper le nombre 4 sinon ca marche pas dans la condition
    const card4K = card.dataset["4k"] === "true";

    // Initialiser la variable d'affichage
    let afficher = true;

    // Filtre ville : si la ville n'est pas "all" et si la ville de la card n'est pas celle choisie, on cache la card
    if (ville !== "all" && cardVille !== ville) {
      afficher = false;
    }

    // Filtre capacité
    if (capacite === "1-5" && (cardCapacite < 1 || cardCapacite > 5)) {
      afficher = false;
    }
    if (capacite === "6-10" && (cardCapacite < 6 || cardCapacite > 10)) {
      afficher = false;
    }
    if (capacite === "11-20" && (cardCapacite < 11 || cardCapacite > 20)) {
      afficher = false;
    }
    if (capacite === "20+" && cardCapacite < 20) {
      afficher = false;
    }

    // Filtre Fibre : on a  const fibre = filterFibre.checked; et const cardFibre = card.dataset.fibre === "true";

    if (fibre && !cardFibre) {
      afficher = false;
    }

    // Filtre PMR
    if (pmr && !cardPMR) {
      afficher = false;
    }

    // Filtre 4K
    if (ecran4K && !card4K) {
      afficher = false;
    }

    // Afficher ou cacher un
    if (afficher) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

// Ajouter des listeners aux filtres et appeler la fonction de filtrage a la detection d'un changement, (fonction sans parrenthese car pas besoin de l'executer au chargement de la page)
filterVille.addEventListener("change", filtrerEspaces);
filterCapacite.addEventListener("change", filtrerEspaces);
filterFibre.addEventListener("change", filtrerEspaces);
filterPMR.addEventListener("change", filtrerEspaces);
filter4K.addEventListener("change", filtrerEspaces);
