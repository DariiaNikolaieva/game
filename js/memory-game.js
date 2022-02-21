// обращение к элементам
const cardsContainer = document.querySelector(".playboard");
const cards = [...document.querySelectorAll(".card")];

// константы
let flippedCards = [];

// логика игрового процесса
function newGame() {
  cards.forEach((card) => {

    // функция сортировки
    const random = Math.floor(Math.random() * cards.length) + 1;
    card.classList.remove("match");

    setTimeout(() => {
      card.style.order = `${random}`;
    }, 400);
  });
}

function isMatch() {
  const [firstCard, secondCard] = flippedCards;
  cardsContainer.classList.add("freezed");

  if (firstCard.dataset.card === secondCard.dataset.card) {
    firstCard.classList.replace("flipped", "match");
    secondCard.classList.replace("flipped", "match");

    flippedCards = [];

    setTimeout(() => {
      const matchedCards = cards.every((card) =>
        card.classList.contains("match")
      );

      cardsContainer.classList.remove("freezed");

      if (matchedCards) {
        newGame();
      }
    }, 1000);
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      flippedCards = [];

      cardsContainer.classList.remove("freezed");
    }, 1000);
  }
}

function flipCard(selectedCards) {
  selectedCards.classList.add("flipped");

  flippedCards.push(selectedCards);

  if (flippedCards.length === 2) {
    isMatch();
  }
}

cards.forEach((card) =>
  card.addEventListener("click", flipCard.bind(flipCard, card))
);

newGame();