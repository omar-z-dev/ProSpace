/*=============================================================
    CARROUSEL              

Role : 

--Faire fonctionner le carroussel des membres de l'equipe au clic sur les fleches précedent et suivant

================================================================*/

//Recuperer la section html de ts les articles des membres d'equipe
const ListAllMembers = document.querySelector(".team-list");

//Recuperer l'article de chaque membre
const cards = document.querySelectorAll(".team-member");

//Recuperer les dots
const dots = document.querySelectorAll(".carousel-dot");

//Recuperer les boutons
const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");

// Variable pour suivre l'index actuel
let currentIndex = 0;

function updateDots() {
  //Role : Mettre à jour les dots en bleu ( classe active)
  //enlever la classe active et la remettre sur le dot actuel
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  dots[currentIndex].classList.add("active");
}

/*======================================
               BTN NEXT
========================================*/

nextButton.addEventListener("click", () => {
  //Role : Faire fonctionner le carroussel des membres de l'equipe au clic sur le bouton suivant

  //Recuperer la premiere carte
  const firstCard = ListAllMembers.firstElementChild;

  //Ajouter la premiere carte en fin de la section
  ListAllMembers.appendChild(firstCard);

  currentIndex++;

  //Si l'index actuel est superieur ou egale au nombre de cartes
  if (currentIndex >= cards.length) {
    currentIndex = 0;
  }

  updateDots();
});

/*==========================================
               BTN PREVIOUS
============================================*/

prevButton.addEventListener("click", () => {
  //Role : Faire fonctionner le carroussel des membres de l'equipe au clic sur le bouton precedent

  //Recuperer la derniere carte
  const lastCard = ListAllMembers.lastElementChild;

  //Ajouter la derniere carte en debut de la section
  ListAllMembers.prepend(lastCard);

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = cards.length - 1;
  }

  updateDots();
});

/*==============================================================

              Mettre à jour le nombre de favoris

===============================================================*/
function updateFavoriteCount() {
  const favoris = JSON.parse(localStorage.getItem("favoris")) || [];

  const favoriteCount = document.getElementById("favorite-count");

  if (favoriteCount) {
    favoriteCount.textContent = favoris.length;
    favoriteCount.style.visibility =
      favoris.length === 0 ? "hidden" : "visible";
  }
}

updateFavoriteCount();
