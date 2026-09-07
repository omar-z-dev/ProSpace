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
  MES ESPACES              

Role : 

--Afficher les espaces favoris de l'utilisateur

================================================================*/
async function afficherMesEspaces() {
  // Récupérer les IDs des favoris dans le localStorage
  const favoris = JSON.parse(localStorage.getItem("favoris")) || [];

  // Mettre à jour les compteurs
  updateFavoriteCount();

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
      <img
        class="saved-space-image"
        src="${espace.images[0]}"
        alt="${espace.nom}"
      >

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
            ★ ${espace.note}
            <small class="color-main heading-tertiary">(${espace.nombreAvis})</small>
          </span>
        </div>
      </div>
      <div class="saved-space-actions">
        <a
          href="fiche.html?id=${espace.id}"
          class="heading-tertiary-bis  btn-primary"
        >Voir fiche</a>

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
  });
}

afficherMesEspaces();
