let firstCard = getRandomCard();
let secondCard = getRandomCard();
let cards = [firstCard, secondCard];
let sum = firstCard + secondCard;
let hasBlackJack = false;
let isAlive = true;
let message = " ";

const startBtn = document.querySelector('#start-game');
const sumEl = document.querySelector('#sum');
const messageEl = document.querySelector('#message-el');
const cardsEl = document.querySelector('#cards');
const newCarts = document.querySelector('#new-carts');

const startGame = () => renderGame();

function getRandomCard() {
    let randomNumber = Math.floor( Math.random() * 13 ) + 1;

    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber;
    }
}

const renderGame = () => {
    cardsEl.textContent = "Cards: ";

    for(let i = 0; i < cards.length; i++) {
        console.log(cards[i]);
        cardsEl.textContent += cards[i] + " ";
    }

    sumEl.textContent = "Sum: " + sum;

    if (sum < 21) {
        message = "Do you want to draw a new card? 🙂";
    } else if (sum === 21) {
        message = "Wohoo! You've got Blackjack! 🥳";
        hasBlackJack = true;
    } else if (sum > 21) {
        message = "You're out of the game! 😭";
        isAlive = false;
    }

    messageEl.textContent = message;
}

const newCard = () => {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
}

startBtn.addEventListener("click", () => {
    startGame();
});

newCarts.addEventListener("click", () => {
    newCard();
});