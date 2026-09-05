/*=============================================================
    VOIR FICHE              

Role : 

--Récupérer l'id de l'article


================================================================*/

// recuperer l'id en recuperant ce qu'il y a apres ? dans l'URL
const params = new URLSearchParams(window.location.search);

// recuperer l'id
const id = params.get("id");

console.log("ID récupéré :", id);

async function chargerEspace() {
  // Recuperer les espaces dans le dossier data
  const response = await fetch("../data/espaces.json");

  const espaces = await response.json();

  console.log("Tous les espaces :", espaces);

  const espace = espaces.find((espace) => espace.id == id);

  console.log("Espace trouvé :", espace);

  document.getElementById("espace-nom").textContent = espace.nom;
}

chargerEspace();
