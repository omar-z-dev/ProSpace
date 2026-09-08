const form = document.getElementById("contact-form");

const nom = document.getElementById("nom");
const email = document.getElementById("email");
const entreprise = document.getElementById("entreprise");
const typeDemande = document.getElementById("type-demande");

const confirmation = document.getElementById("confirmation");

function afficherErreur(champ, message) {
  const erreur = document.getElementById(
    `erreur-${champ.id === "type-demande" ? "type" : champ.id}`,
  );

  erreur.textContent = message;
  champ.setAttribute("aria-invalid", "true");
}

function supprimerErreur(champ) {
  const erreur = document.getElementById(
    `erreur-${champ.id === "type-demande" ? "type" : champ.id}`,
  );

  erreur.textContent = "";
  champ.setAttribute("aria-invalid", "false");
}
function validerNom() {
  if (nom.value.trim() === "") {
    afficherErreur(nom, "Le nom complet est obligatoire.");
    return false;
  }

  supprimerErreur(nom);
  return true;
}

function validerEmail() {
  if (email.value.trim() === "") {
    afficherErreur(email, "L'adresse e-mail est obligatoire.");
    return false;
  }

  if (!email.validity.valid) {
    afficherErreur(email, "Veuillez saisir une adresse e-mail valide.");
    return false;
  }

  supprimerErreur(email);
  return true;
}

function validerEntreprise() {
  if (entreprise.value.trim() === "") {
    afficherErreur(entreprise, "L'entreprise est obligatoire.");
    return false;
  }

  supprimerErreur(entreprise);
  return true;
}

function validerTypeDemande() {
  if (typeDemande.value === "") {
    afficherErreur(typeDemande, "Veuillez sélectionner un type de demande.");
    return false;
  }

  supprimerErreur(typeDemande);
  return true;
}
nom.addEventListener("input", validerNom);
email.addEventListener("input", validerEmail);
entreprise.addEventListener("input", validerEntreprise);
typeDemande.addEventListener("change", validerTypeDemande);
