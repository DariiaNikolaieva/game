// ///////////////ДОПОЛНЕНИЕ
const inputName1 = document.querySelector(".name1");
const inputName2 = document.querySelector(".name2");
const flipCoinBtn = document.querySelector(".flip__coin");
const nameContainer = document.querySelector(".container__name");
const gameContainer = document.querySelector(".container__game");
const startName = document.querySelector(".start__name");

let player = "";
let opponent = "";
let startingPlayer = "";
let finishingPlayer = "";

// score
const scoreFirst = document.querySelector(".score__first_player");
const scoreSecond = document.querySelector(".score__second_player");
const scoreDraw = document.querySelector(".score__draw");
const roundsPlayed = document.querySelector(".score__rounds_number");
const resetScore = document.querySelector(".score__reset");
const scoreContainer = document.querySelector(".container__score");
const winnersList = document.querySelector(".score__winners");

let firstScore = 0;
let draw = 0;
let secondScore = 0;
let rounds = 0;
let movesX = 1;
let movesO = 1;
let winnersArr = JSON.parse(localStorage.getItem("winners")) || [];

// получить имена игроков
function setNames() {
  if (inputName1.value.trim() === "") {
    player = "Player 1";
  } else {
    player = inputName1.value;
  }
  if (inputName2.value.trim() === "") {
    opponent = "Player 2";
  } else {
    opponent = inputName2.value;
  }

  scoreFirst.innerHTML = `${player} <span>0</span>`;
  scoreSecond.innerHTML = `${opponent} <span>0</span>`;
}

// случайный выбор первого игрока
function flipCoin() {
  let scoreB = Math.round(Math.random() * (100 - 1) + 1);
  let scoreA = Math.round(Math.random() * (100 - 1) + 1);

  while (scoreA === scoreB) {
    scoreA = Math.round(Math.random() * (2 - 1) + 1);
    scoreB = Math.round(Math.random() * (2 - 1) + 1);
  }

  startingPlayer = scoreA > scoreB ? player : opponent;
  finishingPlayer = startingPlayer === player ? opponent : player;

  setTimeout(() => {
    flipCoinBtn.removeEventListener("click", flipCoin);
    startName.innerText = `${startingPlayer} plays as X`;
    flipCoinBtn.innerText = "Let's start!";
  }, 1000);
  flipCoinBtn.addEventListener("click", () => {
    nameContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    scoreContainer.classList.remove("hidden");
    body.style.minHeight = '100vh';
    turn.innerText = `${startingPlayer} go!`;
  });
}

flipCoinBtn.addEventListener("click", setNames);
flipCoinBtn.addEventListener("click", flipCoin);

// /////////////// БАЗОВЫЙ КОД
// обращение к элементам
const turn = document.querySelector(".game__turn");
const playAgainBtn = document.querySelector(".game__play_again");
const cells = document.querySelectorAll(".playboard__cell");
const cross = document.querySelector(".cross");

// константы
const x = "X";
const o = "O";

// переменные
let isGamePlay = true;
let xNextMove = true;

// звук
const clickSound = new Audio("/assets/sounds/click-2.wav");
const gameOverSound = new Audio("/assets/sounds/game-over.wav");
const gameWinning = new Audio("/assets/sounds/winner.wav");

// логика игрового процесса
function winSign(sign) {
  return sign === "x" ? startingPlayer : finishingPlayer;
}

function winIdentify(sign) {
  isGamePlay = false;
  rounds += 1;
  roundsPlayed.innerText = `${rounds} / 4`;
  gameOver();
  if (sign === "x") {
    turn.innerHTML = `${winSign(sign)} wins <br/>with ${movesX} moves!`;
    playAgainBtn.classList.remove("btn__disabled");
    if (startingPlayer === player) {
      firstScore += 1;
      scoreFirst.innerHTML = `${player} <span>${firstScore}</span>`;
    } else if (startingPlayer === opponent) {
      secondScore += 1;
      scoreSecond.innerHTML = `${opponent} <span>${secondScore}</span>`;
    }
  } else {
    turn.innerHTML = `<span>${winSign(
      sign
    )} wins <br/>with ${movesO} moves!</span>`;
    playAgainBtn.classList.remove("btn__disabled");
    if (startingPlayer === player) {
      secondScore += 1;
      scoreSecond.innerHTML = `${opponent} <span>${secondScore}</span>`;
    } else if (startingPlayer === opponent) {
      firstScore += 1;
      scoreFirst.innerHTML = `${player} <span>${firstScore}</span>`;
    }
  }
}

function checkWinCondition() {
  const topLeft = cells[0].classList[1];
  const topMiddle = cells[1].classList[1];
  const topRight = cells[2].classList[1];
  const middleLeft = cells[3].classList[1];
  const middleMiddle = cells[4].classList[1];
  const middleRight = cells[5].classList[1];
  const bottomLeft = cells[6].classList[1];
  const bottomMiddle = cells[7].classList[1];
  const bottomRight = cells[8].classList[1];

  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    winIdentify(topLeft);
    cells[0].classList.add("won");
    cells[1].classList.add("won");
    cells[2].classList.add("won");
    cross.classList.add("cross__top_row");
    gameOverSound.play();
  } else if (
    middleLeft &&
    middleLeft === middleMiddle &&
    middleLeft === middleRight
  ) {
    winIdentify(middleLeft);
    cells[3].classList.add("won");
    cells[4].classList.add("won");
    cells[5].classList.add("won");
    cross.classList.add("cross__middle_row");
    gameOverSound.play();
  } else if (
    bottomLeft &&
    bottomLeft === bottomMiddle &&
    bottomLeft === bottomRight
  ) {
    winIdentify(bottomLeft);
    cells[6].classList.add("won");
    cells[7].classList.add("won");
    cells[8].classList.add("won");
    cross.classList.add("cross__button_row");
    gameOverSound.play();
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    winIdentify(topLeft);
    cells[0].classList.add("won");
    cells[3].classList.add("won");
    cells[6].classList.add("won");
    cross.classList.add("cross__left_column");
    gameOverSound.play();
  } else if (
    topMiddle &&
    topMiddle === middleMiddle &&
    topMiddle === bottomMiddle
  ) {
    winIdentify(topMiddle);
    cells[1].classList.add("won");
    cells[4].classList.add("won");
    cells[7].classList.add("won");
    cross.classList.add("cross__middle_column");
    gameOverSound.play();
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    winIdentify(topRight);
    cells[2].classList.add("won");
    cells[5].classList.add("won");
    cells[8].classList.add("won");
    cross.classList.add("cross__right_column");
    gameOverSound.play();
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    winIdentify(topLeft);
    cells[0].classList.add("won");
    cells[4].classList.add("won");
    cells[8].classList.add("won");
    cross.classList.add("cross__left_diagonal");
    gameOverSound.play();
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    winIdentify(topRight);
    cells[2].classList.add("won");
    cells[4].classList.add("won");
    cells[6].classList.add("won");
    cross.classList.add("cross__right_diagonal");
    gameOverSound.play();
  } else if (
    topLeft &&
    topMiddle &&
    topRight &&
    middleLeft &&
    middleMiddle &&
    middleRight &&
    bottomLeft &&
    bottomMiddle &&
    bottomRight
  ) {
    isGamePlay = false;
    turn.innerText = "It's draw!";
    playAgainBtn.classList.remove("btn__disabled");
    draw += 1;
    scoreDraw.innerHTML = `Draw <span>${draw}</span>`;
    rounds += 1;
    roundsPlayed.innerText = `${rounds} / 4`;
    gameOver();
    gameOverSound.play();
  } else {
    xNextMove = !xNextMove;
    if (xNextMove) {
      turn.innerText = `${startingPlayer}'s turn`;
      movesX += 1;
    } else {
      turn.innerHTML = `<span>${finishingPlayer}'s turn</span>`;
      movesO += 1;
    }
  }
}

function playAgain() {
  xNextMove = true;
  movesX = 1;
  movesO = 1;
  [startingPlayer, finishingPlayer] = [finishingPlayer, startingPlayer];
  turn.innerText = `${startingPlayer} go!`;
  cross.removeAttribute("class");
  cross.classList.add("cross");
  for (const cell of cells) {
    cell.classList.remove("x");
    cell.classList.remove("o");
    cell.classList.remove("won");
  }
  isGamePlay = true;
  gameOver();
  playAgainBtn.classList.add("btn__disabled");
}

function clickCell(evt) {
  const classList = evt.target.classList;

  if (!isGamePlay || classList[1] === "x" || classList[1] === "o") {
    return;
  }

  if (xNextMove) {
    classList.add("x");
    checkWinCondition();
  } else {
    classList.add("o");
    checkWinCondition();
  }
  clickSound.play();
}

// слушатели событий
playAgainBtn.addEventListener("click", playAgain);
cells.forEach((cell) => {
  cell.addEventListener("click", clickCell);
});

resetScore.addEventListener("click", resetGame);

function resetGame() {
  rounds = 0;
  draw = 0;
  firstScore = 0;
  secondScore = 0;
  roundsPlayed.innerText = `${rounds} / 4`;
  scoreFirst.innerHTML = `${player} <span>${firstScore}</span>`;
  scoreSecond.innerHTML = `${opponent} <span>${secondScore}</span>`;
  scoreDraw.innerHTML = `Draw <span>${draw}</span>`;
  turn.innerText = `${startingPlayer} go!`;
  xNextMove = true;
  for (const cell of cells) {
    cell.classList.remove("x");
    cell.classList.remove("o");
    cell.classList.remove("won");
    cross.removeAttribute("class");
    cross.classList.add("cross");
  }
}

function gameOver() {
  if (rounds === 4) {
    playAgainBtn.innerText = `Who is the winner?`;
    resetScore.style.display = "none";
    playAgainBtn.removeEventListener("click", playAgain);
    // playAgainBtn.addEventListener("click", showResults);
    playAgainBtn.addEventListener("click", showModal);
  }
}

function showResults() {
  let result;
  const resultText = document.querySelector(".modal__winner_text");
  if (firstScore > secondScore) {
    result = player;
    resultText.innerHTML = `${result}! <br/>You are the winner!`;
    winnersArr.push(result);
  localStorage.setItem("winners", JSON.stringify(winnersArr));
  } else if (secondScore > firstScore) {
    result = opponent;
    resultText.innerHTML = `${result}! <br/>You are the winner!`;
    winnersArr.push(result);
  localStorage.setItem("winners", JSON.stringify(winnersArr));
  } else if (firstScore === secondScore) {
    result = "Well done! <br/>Both of you are <br/>the winners!";
    resultText.innerHTML = `${result}`;
    winnersArr.push(player);
    winnersArr.push(opponent);
  localStorage.setItem("winners", JSON.stringify(winnersArr));
  }
}

function lastWinners() {
  let reverseWinnersArr = winnersArr.reverse();
  if (reverseWinnersArr.length <= 10) {
    for (let i = 0; i <= reverseWinnersArr.length - 1; i += 1) {
      const winnersItem = document.createElement("li");
      winnersItem.innerText = `${reverseWinnersArr[i]}`;
      winnersList.appendChild(winnersItem);
    }
  } else {
    for (let i = 0; i <= 10; i += 1) {
      const winnersItem = document.createElement("li");
      winnersItem.innerText = `${reverseWinnersArr[i]}`;
      winnersList.appendChild(winnersItem);
    }
  }
}

// ///////////Modal
const backdrop = document.querySelector(".backdrop");
const modalContainer = document.querySelector(".modal__container");
const confetti = document.querySelector(".conf__container");

function showModal() {
  gameContainer.classList.add("hidden");
  scoreContainer.classList.add("hidden");
  modalContainer.classList.remove("hidden");
  backdrop.classList.remove("hidden");
  confetti.classList.remove("hidden");
  showResults();
  gameWinning.play();
}

function closeModal() {
  modalContainer.classList.add("hidden");
  backdrop.classList.add("hidden");
}

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeModal();
  }
});

lastWinners();

// анимация конфетти
const Confettiful = function (el) {
  this.el = el;
  this.containerEl = null;

  this.confettiFrequency = 3;
  this.confettiColors = ["#fce18a", "#ff726d", "#b48def", "#f4306d"];
  this.confettiAnimations = ["slow", "medium", "fast"];

  this._setupElements();
  this._renderConfetti();
};

Confettiful.prototype._setupElements = function () {
  const containerEl = document.createElement("div");
  const elPosition = this.el.style.position;

  if (elPosition !== "relative" || elPosition !== "absolute") {
    this.el.style.position = "relative";
  }

  containerEl.classList.add("confetti-container");

  this.el.appendChild(containerEl);

  this.containerEl = containerEl;
};

Confettiful.prototype._renderConfetti = function () {
  this.confettiInterval = setInterval(() => {
    const confettiEl = document.createElement("div");
    const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
    const confettiBackground =
      this.confettiColors[
        Math.floor(Math.random() * this.confettiColors.length)
      ];
    const confettiLeft = Math.floor(Math.random() * this.el.offsetWidth) + "px";
    const confettiAnimation =
      this.confettiAnimations[
        Math.floor(Math.random() * this.confettiAnimations.length)
      ];

    confettiEl.classList.add(
      "confetti",
      "confetti--animation-" + confettiAnimation
    );
    confettiEl.style.left = confettiLeft;
    confettiEl.style.width = confettiSize;
    confettiEl.style.height = confettiSize;
    confettiEl.style.backgroundColor = confettiBackground;

    confettiEl.removeTimeout = setTimeout(function () {
      confettiEl.parentNode.removeChild(confettiEl);
    }, 3000);

    this.containerEl.appendChild(confettiEl);
  }, 25);
};

window.confettiful = new Confettiful(document.querySelector(".js-container"));
