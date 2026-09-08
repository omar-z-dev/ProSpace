/*=============================================================
    CARROUSEL              

Role : 

--Afficher les cards en fonction des filtres

================================================================*/

//Recuperer la section html de ys les articles des membres d'equipe
const ListAllMembers = document.querySelector(".team-list");
const cards = document.querySelectorAll(".team-member");
const dots = document.querySelectorAll(".carousel-dot");

const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");

let currentIndex = 0;

function updateDots() {
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  dots[currentIndex].classList.add("active");
}

nextButton.addEventListener("click", () => {
  const firstCard = ListAllMembers.firstElementChild;

  ListAllMembers.appendChild(firstCard);

  currentIndex++;

  if (currentIndex >= cards.length) {
    currentIndex = 0;
  }

  updateDots();
});

prevButton.addEventListener("click", () => {
  const lastCard = ListAllMembers.lastElementChild;

  ListAllMembers.prepend(lastCard);

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = cards.length - 1;
  }

  updateDots();
});
