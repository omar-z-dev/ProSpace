async function afficherMesEspaces() {
  // Récupérer les IDs des favoris dans le localStorage
  const favoris = JSON.parse(localStorage.getItem("favoris")) || [];

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

    // Ajouter le contenu HTML de la card
    card.innerHTML = `
      <img
        class="saved-space-image"
        src="${espace.images[0]}"
        alt="${espace.nom}"
      >

      <div class="saved-space-content">
        <h2>${espace.nom}</h2>
        <p class="saved-space-location">
          ${espace.ville}
        </p>
        <div class="saved-space-details">
          <span class="saved-space-capacity">
            ${espace.capacite} pers.
          </span>

          <span class="saved-space-price">
            ${espace.tarifs.heure}€
            <small>/h</small>
          </span>

          <span class="saved-space-rating">
            ★ ${espace.note}
            <small>(${espace.nombreAvis})</small>
          </span>
        </div>
      </div>
      <div class="saved-space-actions">
        <a
          href="fiche.html?id=${espace.id}"
          class="view-btn"
        >Voir fiche</a>

        <button
          class="remove-btn"
          data-id="${espace.id}"
        >Retirer</button>
      </div>
    `;

    // Ajouter la card dans la section HTML
    liste.appendChild(card);
  });
}

afficherMesEspaces();
