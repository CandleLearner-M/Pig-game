'use strict';

// targetting the elements
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');
const diceImage = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const score1 = document.getElementById('score--0');
const score2 = document.getElementById('score--1');

// initial conditions

let currentPlyer, currentScore, totalScore, gameActive;

function initial() {
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  diceImage.classList.add('hidden');
  currentPlyer = 0;
  currentScore = 0;
  totalScore = [0, 0];
  gameActive = true;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
}

initial();

const changePlayer = function () {
  document.getElementById(`current--${currentPlyer}`).textContent = 0;
  currentScore = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  currentPlyer = currentPlyer === 0 ? 1 : 0;
};

// roll dice

btnRoll.addEventListener('click', function () {
  if (!gameActive) return;
  // 1. Generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice roll
  diceImage.classList.remove('hidden');
  diceImage.src = `dice-${dice}.png`;

  // 3. Check if rolled 1

  if (dice !== 1) {
    // If not rolled 1
    currentScore += dice;
    document.getElementById(`current--${currentPlyer}`).textContent =
      currentScore;
  } else {
    // if rolled 1
    changePlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (!gameActive) return;
  // add current score to total score
  totalScore[currentPlyer] += currentScore;
  document.getElementById(`score--${currentPlyer}`).textContent =
    totalScore[currentPlyer];
  // check if the totall score is >= 100
  if (totalScore[currentPlyer] >= 100) {
    gameActive = false;
    diceImage.classList.add('hidden');

    document
      .querySelector(`.player--${currentPlyer}`)
      .classList.add('player--winner');
  } else {
    changePlayer();
  }
});

btnNew.addEventListener('click', initial);
