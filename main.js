const STYLE_BAG = 'bag';
const STYLE_BAG_IMAGE = 'bag-image';
const STYLE_BAG_VALUE = 'bag-value';
const STYLE_HIDDEN = 'hidden';

const URL_BAG_IMAGE = 'images/money-bag.png';

const DEFAULT_BAG_VALUE = '?';

const randomInteger = (range) => {

  const space = range * range | 0;

  const integer = space * Math.random() | 0;

  return integer % range | 0;

};

const createPermutation = () => {

  let permutation = [
    -1, -1, -1, -1,
    -1, -1, -1, -1,
    -1, -1, -1, -1,
    -1, -1, -1, -1,
  ];

  let filled = 0;

  while (filled < 16) {

    const index = randomInteger(16);

    if (permutation[index] >= 0) {
      continue;
    }

    permutation[index] = filled;

    filled = filled + 1 | 0;

  }

  return permutation;

};

const prizes = [
  250000,
  125000,
   62500,
     500,
    1000,
    1500,
    2000,
    2500,
    3000,
    4000,
    5000,
    6000,
    7000,
    8000,
    9000,
   10000,
];

const gameState = {
  selectedBag: null,
  requestedChange: false,
};

const bags = [
  null, null, null, null,
  null, null, null, null,
  null, null, null, null,
  null, null, null, null,
];

const state1 = document.getElementById('game-status-001');
const state2 = document.getElementById('game-status-002');
const state3 = document.getElementById('game-status-003');

state1.classList.remove(STYLE_HIDDEN);

const prizeOutput = document.getElementById('prize-output');

const gameEnd = () => {

  bags.forEach((bag) => {
    bag.reveal();
  });

  state1.classList.add(STYLE_HIDDEN);
  state2.classList.add(STYLE_HIDDEN);
  state3.classList.remove(STYLE_HIDDEN);

  prizeOutput.innerText = gameState.selectedBag.prize.toString();

};

const revealRandom = () => {

  while (true) {

    const index = randomInteger(bags.length);

    const bag = bags[index];

    if (bag === gameState.selectedBag) {
      continue;
    }

    bag.reveal();
    break;

  }

};

const bagSelected = () => {

  state1.classList.add(STYLE_HIDDEN);

  if (gameState.requestedChange) {

    gameEnd();

  } else {

    revealRandom();
    state2.classList.remove(STYLE_HIDDEN);

  }

};

const createBags = (root) => {

  const permutation = createPermutation();

  permutation.forEach((index) => {

    const prize = prizes[index];

    const bag = document.createElement('div');
    bag.classList.add(STYLE_BAG);

    const bagImage = document.createElement('img');
    bagImage.classList.add(STYLE_BAG_IMAGE);
    bagImage.src = URL_BAG_IMAGE;

    const bagValue = document.createElement('div');
    bagValue.classList.add(STYLE_BAG_VALUE);
    bagValue.innerText = DEFAULT_BAG_VALUE;

    bag.append(bagImage);
    bag.append(bagValue);

    const revealBag = () => {
      bagValue.innerText = prize.toString();
      bagState.revealed = true;
    };

    const bagState = {
      element: bag,
      selected: false,
      prize: prize,
      reveal: revealBag,
      revealed: false,
    };

    bags[index] = bagState;

    bag.onclick = () => {

      if (gameState.selectedBag || bagState.selected || bagState.revealed) {
        return;
      }

      gameState.selectedBag = bagState;

      bagState.selected = true;
      bag.setAttribute('data-selected', 'true');

      setTimeout(bagSelected);

    };

    root.append(bag);

  });

};

const gameBoard = document.getElementById('game-board');

createBags(gameBoard);

const buttonYes = document.getElementById('button-yes');
const buttonNo = document.getElementById('button-no');

buttonYes.onclick = () => {

  gameState.selectedBag.element.removeAttribute('data-selected');
  gameState.selectedBag = null;
  gameState.requestedChange = true;

  state2.classList.add(STYLE_HIDDEN);
  state1.classList.remove(STYLE_HIDDEN);

};

buttonNo.onclick = () => {

  gameEnd();

};

