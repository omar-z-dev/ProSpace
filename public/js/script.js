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
  }
}

// Vérifier les favoris au chargement
favoriteButtons.forEach((button) => {
  const id = button.dataset.id;

  // Si déjà dans les favoris
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
