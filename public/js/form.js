const form = document.getElementById("contact-form");

const nom = document.getElementById("nom");
const email = document.getElementById("email");
const entreprise = document.getElementById("entreprise");
const typeDemande = document.getElementById("type-demande");
const message = document.getElementById("message");
const rgpd = document.getElementById("rgpd");

const confirmation = document.getElementById("confirmation");

/*************** Affichage de l'erreur ***************/
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
/*************** NOM ***************/
function validerNom() {
  if (nom.value.trim() === "") {
    afficherErreur(nom, "Le nom complet est obligatoire.");
    return false;
  }

  supprimerErreur(nom);
  return true;
}
/*************** EMAIL ***************/
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
/*************** ENTREPRISE ***************/
function validerEntreprise() {
  if (entreprise.value.trim() === "") {
    afficherErreur(entreprise, "L'entreprise est obligatoire.");
    return false;
  }

  supprimerErreur(entreprise);
  return true;
}
/*************** MESSAGE ***************/
function validerMessage() {
  if (message.value.trim() === "") {
    afficherErreur(message, "Le message est obligatoire.");
    return false;
  }

  supprimerErreur(message);
  return true;
}
/*************** RGPD ***************/
function validerRgpd() {
  const erreur = document.getElementById("erreur-rgpd");

  if (!rgpd.checked) {
    erreur.textContent = "Vous devez accepter les conditions.";
    rgpd.setAttribute("aria-invalid", "true");
    return false;
  }

  erreur.textContent = "";
  rgpd.setAttribute("aria-invalid", "false");
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
message.addEventListener("input", validerMessage);
rgpd.addEventListener("change", validerRgpd);

/*************** Envoi du formulaire au clic sur envoyer***************/

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nomValide = validerNom();
  const emailValide = validerEmail();
  const entrepriseValide = validerEntreprise();
  const typeValide = validerTypeDemande();
  const messageValide = validerMessage();
  const rgpdValide = validerRgpd();

  if (
    !nomValide ||
    !emailValide ||
    !entrepriseValide ||
    !typeValide ||
    !messageValide ||
    !rgpdValide
  ) {
    return;
  }

  confirmation.textContent = "Votre message a bien été envoyé.";
  form.reset();
});
