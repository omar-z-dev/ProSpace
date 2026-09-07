/*=============================================================
    VOIR FICHE              

Role : 

--afficher l espace au clic sur voir fiche


================================================================*/
//chargement du html fiche.html au chargement de la page
// recuperer l'id en recuperant ce qu'il y a apres ? dans l'URL
const params = new URLSearchParams(window.location.search);

// recuperer l'id
const id = params.get("id");

console.log("ID récupéré :", id);

async function chargerEspace() {
  // Recuperer les espaces dans le dossier data
  const response = await fetch("../data/espaces.json");

  //attendre la reponse et recuperer les espaces en json
  const espaces = await response.json();

  console.log("Tous les espaces :", espaces);

  // Trouver l'espace correspondant à l'ID récupéré
  const espace = espaces.find((espace) => espace.id == id);
  // Fil d'Ariane : ville
  document.getElementById("breadcrumb-ville").textContent = espace.ville;

  // Fil d'Ariane : nom de l'espace
  document.getElementById("breadcrumb-espace").textContent = espace.nom;

  console.log("Espace trouvé :", espace);

  //nom de l espace
  document.getElementById("espace-nom").textContent = espace.nom;
  //adresse
  document.getElementById("espace-adresse").textContent = espace.adresse;
  //note
  document.getElementById("espace-note").textContent = espace.note;
  //avis
  document.getElementById("espace-avis").textContent =
    `· ${espace.nombreAvis} avis vérifiés`;
  //description
  document.getElementById("espace-description").textContent =
    espace.description;
  //capacite
  document.getElementById("espace-capacite").textContent = espace.capacite;

  //galerie des images
  document.getElementById("image-principale").src = espace.images[0];
  document.getElementById("image-principale").alt = `Vue de ${espace.nom}`;

  document.getElementById("image-secondaire-1").src = espace.images[1];
  document.getElementById("image-secondaire-1").alt =
    `Intérieur de ${espace.nom}`;

  document.getElementById("image-secondaire-2").src = espace.images[2];
  document.getElementById("image-secondaire-2").alt =
    `Espace de travail ${espace.nom}`;

  //equipement

  // Récupérer la liste HTML des équipements
  const listeEquipements = document.getElementById("espace-equipements");

  // Parcourir tous les équipements de l'espace
  espace.equipements.forEach((equipement) => {
    // Créer un élément <li>
    const li = document.createElement("li");
    li.classList.add("equipment");

    // Mettre le nom de l'équipement dans le <li>
    li.textContent = equipement;

    // Ajouter le <li> dans la liste <ul>
    listeEquipements.appendChild(li);
  });

  // Tarifs
  document.getElementById("prix-heure").textContent = `${espace.tarifs.heure}€`;

  document.getElementById("prix-demi-journee").textContent =
    `${espace.tarifs.demiJournee}€`;

  document.getElementById("prix-journee").textContent =
    `${espace.tarifs.journee}€`;

  /*=============================================================
    

              SAUVGARDER EN FAVORIS DEPUIS DETAIL FICHE              

Role : 

--Enregistrer les favoris de l'utilisateur dans le localStorage et mettre à jour le css du bouton favoris

================================================================*/
  function updateFavoriteCount() {
    //Role : Mettre à jour le compteur de favoris dans le header
    const favoriteCount = document.getElementById("favorite-count");

    if (!favoriteCount) return;

    const favoris = JSON.parse(localStorage.getItem("favoris")) || [];

    favoriteCount.textContent = favoris.length;

    if (favoris.length === 0) {
      favoriteCount.style.visibility = "hidden";
    } else {
      favoriteCount.style.visibility = "visible";
    }
  }
  // Récupérer les favoris depuis localStorage
  let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

  // Récupérer le bouton
  const favoriteButton = document.getElementById("favorite-button");

  // Mettre à jour l'apparence du bouton
  function updateFavoriteButton() {
    //Role : Vérifier si l'espace est déjà dans les favoris et mettre à jour l'apparence du bouton

    // Vérifier si l'espace est déjà dans les favoris
    const dejaFavori = favoris.includes(String(espace.id));

    if (dejaFavori) {
      favoriteButton.classList.add("active");
    } else {
      favoriteButton.classList.remove("active");
    }
  }

  // Vérifier au chargement
  updateFavoriteButton();
  updateFavoriteCount();

  favoriteButton.addEventListener("click", () => {
    const id = String(espace.id);

    if (favoris.includes(id)) {
      favoris = favoris.filter((favoriteId) => favoriteId !== id);
    } else {
      favoris.push(id);
    }

    localStorage.setItem("favoris", JSON.stringify(favoris));

    updateFavoriteButton();
    updateFavoriteCount();
  });
}

chargerEspace();
