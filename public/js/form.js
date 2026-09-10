/*=================================================
  FORMULAIRE

  Role : 

  -- Valider le formulaire de contact

  =================================================*/

// recup div de tous le fomulaire
const form = document.getElementById("contact-form");

//Recup les 6 inputs
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const entreprise = document.getElementById("entreprise");
const typeDemande = document.getElementById("type");
const message = document.getElementById("message");
const rgpd = document.getElementById("rgpd");

//recup bouton envoyer le message
const confirmation = document.getElementById("confirmation");

/********************************** 
 * 
       Affichage de l'erreur
 
 **********************************/
function afficherErreur(champ, message) {
  //Role : Afficher l'erreur
  const erreur = document.getElementById(`erreur-${champ.id}`);

  //Affichage de l'erreur
  erreur.textContent = message;

  //Indication lecteur d'ecran de l'erreur
  champ.setAttribute("aria-invalid", "true");
}
/********************************** 
 * 
       Supprimer  l'erreur
 
 **********************************/
function supprimerErreur(champ) {
  const erreur = document.getElementById(`erreur-${champ.id}`);

  //Suppression de l'erreur
  erreur.textContent = "";

  //Indication lecteur d'ecran pas d'erreur
  champ.setAttribute("aria-invalid", "false");
}
/**************** 
       NOM 

 ***************/
function validerNom() {
  if (nom.value.trim() === "") {
    afficherErreur(nom, "Le nom est obligatoire.");
    // return false pour annuler l'envoi du formulaire
    return false;
  }
  // nom doit contenir uniquement des lettres
  if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(nom.value.trim())) {
    afficherErreur(nom, "Le nom doit contenir uniquement des lettres.");
    return false;
  }
  supprimerErreur(nom);
  // return true pour valider l'envoi du formulaire
  return true;
}
/*************** 
    EMAIL 
 
 ***************/
function validerEmail() {
  if (email.value.trim() === "") {
    afficherErreur(email, "L'adresse e-mail est obligatoire.");
    return false;
  }
  // validité de l'email checké par le navigateur
  if (!email.validity.valid) {
    afficherErreur(email, "Veuillez saisir une adresse e-mail valide.");
    return false;
  }

  supprimerErreur(email);
  return true;
}
/***************
   ENTREPRISE
 
 ***************/
function validerEntreprise() {
  if (entreprise.value.trim() === "") {
    afficherErreur(entreprise, "Le nom de l'entreprise est obligatoire.");
    return false;
  }

  supprimerErreur(entreprise);
  return true;
}
/***************
     MESSAGE
 
 ***************/
function validerMessage() {
  if (message.value.trim() === "") {
    afficherErreur(message, "Le message est obligatoire.");
    return false;
  }

  supprimerErreur(message);
  return true;
}
/***************
      RGPD
 
 ***************/
function validerRgpd() {
  if (!rgpd.checked) {
    afficherErreur(rgpd, "Vous devez accepter les conditions.");
    return false;
  }

  supprimerErreur(rgpd);
  return true;
}

/******************
  Type de demande
 
*******************/
function validerTypeDemande() {
  if (typeDemande.value === "") {
    afficherErreur(typeDemande, "Veuillez sélectionner un sujet de demande.");
    return false;
  }

  supprimerErreur(typeDemande);
  return true;
}

// Ajouter des listeners aux inputs pour lancer automatiquement les fonction de validation
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
