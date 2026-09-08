const track = document.querySelector(".team-list");
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
  const firstCard = track.firstElementChild;

  track.appendChild(firstCard);

  currentIndex++;

  if (currentIndex >= cards.length) {
    currentIndex = 0;
  }

  updateDots();
});

prevButton.addEventListener("click", () => {
  const lastCard = track.lastElementChild;

  track.prepend(lastCard);

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = cards.length - 1;
  }

  updateDots();
});
