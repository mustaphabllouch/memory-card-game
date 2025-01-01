const gameBoard = document.getElementById('game-board');

// Array of card values
const cardValues = ['🍎', '🍌', '🍓', '🍇', '🍒', '🍍', '🍋', '🥝'];
const cards = [...cardValues, ...cardValues]; // Duplicate for pairs
let flippedCards = [];
let matchedPairs = 0;

// Shuffle the cards
cards.sort(() => Math.random() - 0.5);

// Create cards dynamically
cards.forEach((value) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-front">${value}</div>
    <div class="card-back"></div>
  `;
  gameBoard.appendChild(card);

  // Add click event to flip cards
  card.addEventListener('click', () => handleCardFlip(card, value));
});

function handleCardFlip(card, value) {
  if (card.classList.contains('flip') || flippedCards.length === 2) return;

  card.classList.add('flip');
  flippedCards.push({ card, value });

  // Check for match when two cards are flipped
  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  const [first, second] = flippedCards;
  if (first.value === second.value) {
    matchedPairs++;
    flippedCards = [];
    if (matchedPairs === cardValues.length) {
      setTimeout(() => alert('You Win!'), 500);
    }
  } else {
    // Unflip cards if not matched
    setTimeout(() => {
      first.card.classList.remove('flip');
      second.card.classList.remove('flip');
      flippedCards = [];
    }, 1000);
  }
}
