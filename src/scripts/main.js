let firstCard = 7;
let secondCard = 11;
let hasBlackJack = false;
let isAlive = true;
let message = " ";
let cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const startBtn = document.querySelector('#start-game');
const sumEl = document.querySelector('#sum');
const messageEl = document.querySelector('#message-el');
const cardsEl = document.querySelector('#cards');
const newCarts = document.querySelector('#new-carts');

let sum = firstCard + secondCard;

const renderGame = () => {
    sumEl.textContent = 'Sum: ' + sum;
    if (sum < 21) {
        message = "Do you want to draw a new card? 🙂";
        isAlive = false;
    } else if (sum === 21) {
        message = "Wohoo! You've got Blackjack! 🥳";
        hasBlackJack = true;
    } else if (sum > 21) {
        message = "You're out of the game! 😭";
        isAlive = false;
    }
    messageEl.textContent = message;
    cardsEl.textContent = 'Cards: ' + firstCard + ' ' + secondCard;
}

const startGame = () => renderGame();

const newCard = () => {
    console.log("Drawing a new card from the deck!");
    let card = 7;
    sum += card;
    startGame();
}

startBtn.addEventListener("click", () => {
    renderGame();
});

newCarts.addEventListener("click", () => {
    newCard();
});