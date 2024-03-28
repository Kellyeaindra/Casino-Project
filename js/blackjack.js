let deck = [];
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
//Define images for each suit
const suitImages = {
  Hearts: "../img/heart.jpg",
  Diamonds: "../img/diamond.jpg",
  Clubs: "../img/clubs.jpg",
  Spades: "../img/spades.jpg",
};
//Define card value
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
let playerHand = [];
let dealerHand = [];
let isGameStarted = false;
var userinfo = JSON.parse(localStorage.getItem("userinfo"));
var index = localStorage.getItem("userIndex");
let playerBalance = userinfo[index]["amount"];
document.getElementById("balance").innerHTML = `${playerBalance} Ks`;
let betAmount = 0;
/**
 * Function to update the displayed player blaance
 */
function updateBalance() {
  document.getElementById("betAmount").value = "";
  document.getElementById("balance").innerHTML = `${playerBalance} Ks`;
}

/**
 * This function used to create a new deck of cards
 */
function createDeck() {
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
}
/**
 * This function used to shuffle the deck
 */
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}
/**
 *
 * This function used to the start game
 */
function startGame() {
  if (!isGameStarted) {
    //check there are a valid bet amount
    betAmount = parseInt(document.getElementById("betAmount").value);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > playerBalance) {
      alert("Invalid bet amount.Please enter a valid bet.");
      return;
    }
    createDeck();
    shuffleDeck();
    playerHand = [drawCard(), drawCard()];
    dealerHand = [drawCard(), drawCard()];
    isGameStarted = true;
    updateDisplay();
  }
}
/**
 *
 *  This function used to draw a card from the dack
 */
function drawCard() {
  return deck.pop();
}
/**
 * This finction used to calculatethe value of a hand, considering Aces
 * @param {*} hand
 * @returns sum
 */
function calculateHandValue(hand) {
  let sum = 0;
  let numAce = 0;

  for (let card of hand) {
    if (card.value === "A") {
      numAce++;
    }
    sum += cardValue(card.value);
  }

  if (numAce > 0 && sum > 21) {
    sum -= 10;
    numAce--;
  }
  return sum;
}
/**
 * This function used to assign values to cards
 * @param {*} value
 * @returns value
 */
function cardValue(value) {
  if (value === "A") return 11;
  if (["K", "Q", "J"].includes(value)) return 10;
  return parseInt(value);
}

/**
 * This function used to diaplay with the current game state
 */
function updateDisplay() {
  document.getElementById("player-hand").innerHTML = formatHand(playerHand);
  document.getElementById("dealer-hand").innerHTML = formatHand(dealerHand);
  document.getElementById("result").textContent = getResultMessage();
}

/**
 * This function used to format the hand for display
 * @param {*} hand
 * @returns hand
 */
function formatHand(hand) {
  return hand
    .map(
      (card) =>
        `<div class="card"><img src="${suitImages[card.suit]}" alt="${
          card.value
        } of ${card.suit}"></br>${card.value}</div>`
    )
    .join(" ");
}

/*
 * This function used to determine the game result
 */
function getResultMessage() {
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  if (playerValue > 21) {
    isGameStarted = false;

    playerBalance -= betAmount;
    userinfo[index]["amount"] = playerBalance;
    localStorage.setItem("userinfo", JSON.stringify(userinfo));
    updateBalance();
    return `Bust! You lose ${betAmount} Ks.`;
  }

  if (dealerValue > 21) {
    isGameStarted = false;
    playerBalance += betAmount;
    userinfo[index]["amount"] = playerBalance;
    localStorage.setItem("userinfo", JSON.stringify(userinfo));
    updateBalance();
    return `Dealer bust! You Win ${betAmount} Ks.`;
  }

  if (!isGameStarted) {
    if (playerValue > dealerValue) {
      playerBalance += betAmount;
      userinfo[index]["amount"] = playerBalance;
      localStorage.setItem("userinfo", JSON.stringify(userinfo));
      updateBalance();
      return `You win ${betAmount} Ks!`;
    } else if (playerValue < dealerValue) {
      playerBalance -= betAmount;
      userinfo[index]["amount"] = playerBalance;
      localStorage.setItem("userinfo", JSON.stringify(userinfo));
      updateBalance();
      return `You lose ${betAmount} Ks.`;
    } else {
      updateBalance();
      return "It's a tie!";
    }
  }

  return "";
}
/**
 * This function used for the playerto draw a new card
 */
function hit() {
  if (isGameStarted) {
    playerHand.push(drawCard());
    updateDisplay();
  }
}
/**
 * /this function used for the player to stand and end their turn
 */
function stand() {
  if (isGameStarted) {
    //Dealer draws until the total is at least 17
    while (calculateHandValue(dealerHand) < 16) {
      dealerHand.push(drawCard());
    }

    //Check the player hand value is less than 16 , automatically lose
    if (calculateHandValue(playerHand) < 16) {
      isGameStarted = false;
      playerBalance -= betAmount;
      userinfo[index]["amount"] = playerBalance;
      localStorage.setItem("userinfo", JSON.stringify(userinfo));
      updateBalance();
      document.getElementById(
        "result"
      ).textContent = ` You lose ${betAmount} Ks.Player hand value is less than 16.`;
    } else {
      isGameStarted = false;
      updateDisplay();
    }
  }
}
