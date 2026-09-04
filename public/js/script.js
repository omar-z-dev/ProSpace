/*=============================================================
            FAVORIS              

Role : 

--Enregistrer les favoris de l'utilisateur dans le localStorage et mettre à jour le compteur Mes espces

--Modifier le css de l'icone de favoris

================================================================*/

// Récupérer les favoris depuis localStorage ou créer un tableau vide
let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

// Récupérer tous les boutons cœur
const favoriteButtons = document.querySelectorAll(".favorite");

// Récupérer le compteur
const favoriteCount = document.getElementById("favorite-count");
console.log("Nombre de Boutons coeurs existants :", favoriteButtons.length);
console.log("Favoris :", favoris);

// Mettre à jour le nombre de favoris
function updateFavoriteCount() {
  if (favoriteCount) {
    favoriteCount.textContent = favoris.length;
    if (favoris.length === 0) {
      favoriteCount.style.visibility = "hidden";
    } else {
      favoriteCount.style.visibility = "visible";
    }
  }
}

// Vérifier les favoris au chargement
favoriteButtons.forEach((button) => {
  const id = button.dataset.id;

  // Si déjà dans les favoris les coeur restent rouges meme apres refresh de la page
  if (favoris.includes(id)) {
    button.classList.add("active");
  }

  // Au clic sur le cœur
  button.addEventListener("click", () => {
    console.log("CLICK DETECTÉ :", id);
    // Ajouter ou enlever la classe active
    button.classList.toggle("active");

    // Vérifier si le favori existe déjà
    if (favoris.includes(id)) {
      // Supprimer le favori
      favoris = favoris.filter((favoriteId) => favoriteId !== id);
    } else {
      // Ajouter le favori
      favoris.push(id);
    }

    // Enregistrer dans localStorage
    localStorage.setItem("favoris", JSON.stringify(favoris));

    // Mettre à jour le compteur
    updateFavoriteCount();
  });
});

// Afficher le nombre au chargement
updateFavoriteCount();

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
  console.log(pmr);
  const ecran4K = filter4K.checked;

  cards.forEach((card) => {
    console.log("test");
    // Récupérer les valeurs des cards
    const cardVille = card.dataset.ville;
    const cardCapacite = Number(card.dataset.capacite);
    const cardFibre = card.dataset.fibre === "true";
    const cardPMR = card.dataset.pmr === "true";
    //crocher pour echapper le nombre 4 sinon ca marche pas dans la condition
    const card4K = card.dataset["4k"] === "true";

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

    // Afficher ou cacher
    if (afficher) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}
filterVille.addEventListener("change", filtrerEspaces);

filterCapacite.addEventListener("change", filtrerEspaces);

filterFibre.addEventListener("change", filtrerEspaces);

filterPMR.addEventListener("change", filtrerEspaces);

filter4K.addEventListener("change", filtrerEspaces);
