async function afficherMesEspaces() {
  // Récupérer les IDs des favoris
  const favoris = JSON.parse(localStorage.getItem("favoris")) || [];

  console.log("Favoris :", favoris);

  // Récupérer tous les espaces
  const response = await fetch("../data/espaces.json");

  const espaces = await response.json();

  // Garder uniquement les espaces likés
  const espacesFavoris = espaces.filter((espace) =>
    favoris.includes(String(espace.id)),
  );

  console.log("Espaces favoris :", espacesFavoris);
}

afficherMesEspaces();
