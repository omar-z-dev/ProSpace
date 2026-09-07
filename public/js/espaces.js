/*=============================================================         

Role : Mise a jour du nombre de favoris dans le badge du header et dans la page "Mes Espaces"

================================================================*/
function updateFavoriteCount() {
  // Récupérer les favoris dans localStorage
  const favoris = JSON.parse(localStorage.getItem("favoris")) || [];

  // Badge dans le header
  const favoriteCount = document.getElementById("favorite-count");

  // Nombre dans "Mes Espaces Sauvegardés"
  const nombreEspaces = document.getElementById("nombre-espaces");
  // Texte dans "Mes Espaces Sauvegardés"
  const selectionText = document.getElementById("selection-text");

  // Mettre à jour le badge
  if (favoriteCount) {
    favoriteCount.textContent = favoris.length;

    if (favoris.length === 0) {
      favoriteCount.style.visibility = "hidden";
    } else {
      favoriteCount.style.visibility = "visible";
    }
  }

  // Mettre à jour le texte dans Mes Espaces
  if (nombreEspaces) {
    nombreEspaces.textContent = favoris.length;
  }
}
/*=============================================================
  VÉRIFIER SI LA SÉLECTION EST VIDE

Role : 

--Afficher le message "Aucun espace favori" si la sélection est vide

================================================================*/
function updateEmptyState() {
  const favoris = JSON.parse(localStorage.getItem("favoris")) || [];

  const liste = document.getElementById("mes-espaces-list");
  const emptyFavorites = document.getElementById("empty-favorites");

  if (favoris.length === 0) {
    // Masquer la liste
    liste.style.display = "none";

    // Afficher le message vide
    emptyFavorites.style.display = "flex";
  } else {
    // Afficher la liste
    liste.style.display = "flex";

    // Masquer le message vide
    emptyFavorites.style.display = "none";
  }
}

/*=============================================================
  MES ESPACES              

Role : 

--Afficher les espaces favoris de l'utilisateur

================================================================*/
async function afficherMesEspaces() {
  // Récupérer les IDs des favoris dans le localStorage
  const favoris = JSON.parse(localStorage.getItem("favoris")) || [];

  // Mettre à jour les compteurs
  updateFavoriteCount();
  // Vérifier si la sélection est vide
  updateEmptyState();

  // Récupérer la section HTML où ajouter les cards
  const liste = document.getElementById("mes-espaces-list");

  console.log("Favoris mes espaces IDs:", favoris);

  // Récupérer tous les espaces dans le dossier data
  const response = await fetch("../data/espaces.json");

  const espaces = await response.json();

  // Garder uniquement les espaces likés
  const espacesFavoris = espaces.filter((espace) =>
    favoris.includes(String(espace.id)),
  );

  console.log("Espaces favoris TABLEAUX :", espacesFavoris);

  // Créer une card pour chaque espace favori
  espacesFavoris.forEach((espace) => {
    // Créer un élément article pour chaque espace
    const card = document.createElement("article");

    // Ajouter la classe CSS pour le style
    card.classList.add("saved-space");

    // Créer le contenu HTML de la card
    card.innerHTML = `
      <div class="saved-space-image-container">
        <img
          class="saved-space-image"
          src="${espace.images[0]}"
          alt="${espace.nom}"
        >
      </div>

      <div class="saved-space-content">
        <h2 class="heading-secondary">${espace.nom}</h2>
        <p class="color-main heading-tertiary">
          ${espace.ville}
        </p>
        <div class="saved-space-details">
          <span class="color-main heading-tertiary">
            ${espace.capacite} pers.
          </span>

          <span class="color-price-space text-price-space">
            ${espace.tarifs.heure}€
            <small>/h</small>
          </span>

          <span class="text-notation">
            ⭐⭐⭐
            <small class="color-main heading-tertiary">(${espace.nombreAvis})</small>
          </span>
        </div>
      </div>
      <div class="saved-space-actions">
        <a
          href="fiche.html?id=${espace.id}"
          class="heading-tertiary-bis  btn-primary"
        >Voir la fiche</a>

        <button class="heading-tertiary-bis btn-secondary" data-id="${espace.id}">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M1.875 3.75H13.125"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.875 3.75V12.5C11.875 13.125 11.25 13.75 10.625 13.75H4.375C3.75 13.75 3.125 13.125 3.125 12.5V3.75"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 3.75V2.5C5 1.875 5.625 1.25 6.25 1.25H8.75C9.375 1.25 10 1.875 10 2.5V3.75"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.25 6.875V10.625"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.75 6.875V10.625"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Retirer
        </button>
      </div>
    `;

    // Ajouter la card dans la section HTML
    liste.appendChild(card);

    /*=============================================================

                        RETIRER UN ESPACE

      Role : Retirer un espace de la liste des favoris au clic 
      sur le bouton RETIRER

    =============================================================*/

    // Récupérer le bouton Retirer de cette card
    const removeButton = card.querySelector(".btn-secondary");

    // Au clic sur Retirer
    removeButton.addEventListener("click", () => {
      // Récupérer l'ID de l'espace
      const id = removeButton.dataset.id;

      // Récupérer les favoris
      let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

      // Retirer cet espace du tableau
      favoris = favoris.filter((favori) => favori !== id);

      // Sauvegarder le nouveau tableau dans localStorage
      localStorage.setItem("favoris", JSON.stringify(favoris));

      // Retirer visuellement la card
      card.remove();

      // Mettre à jour le badge et le nombre d'espaces
      updateFavoriteCount();
    });
  });
}

afficherMesEspaces();

/*=============================================================
                    VIDER TOUS LES FAVORIS

Role :

--Retirer tous les espaces favoris au clic sur
  "Vider ma sélection"

================================================================*/

const clearFavoritesButton = document.getElementById("clear-favorites");

clearFavoritesButton.addEventListener("click", () => {
  // Supprimer tous les favoris du localStorage
  localStorage.removeItem("favoris");

  // Retirer toutes les cards visuellement en vidant la section
  const liste = document.getElementById("mes-espaces-list");
  liste.innerHTML = "";

  // Mettre à jour le badge et le nombre d'espaces
  updateFavoriteCount();

  // Vérifier immédiatement si la sélection est vide
  updateEmptyState();
});
