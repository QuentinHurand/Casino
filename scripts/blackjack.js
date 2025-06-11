let dealerHand = [];
let playerHand = [];

function dealCards() {
    dealerHand = [getRandomCard(), getRandomCard()];
    playerHand = [getRandomCard(), getRandomCard()];

    updateBlackjackTable();
}

function hit() {
    playerHand.push(getRandomCard());
    updateBlackjackTable();

    if (calculateHandValue(playerHand) > 21) {
        alert("Vous avez dépassé 21! Vous avez perdu.");
    }
}

function stand() {
    while (calculateHandValue(dealerHand) < 17) {
        dealerHand.push(getRandomCard());
    }
    updateBlackjackTable();

    const dealerValue = calculateHandValue(dealerHand);
    const playerValue = calculateHandValue(playerHand);

    if (dealerValue > 21 || playerValue > dealerValue) {
        alert("Félicitations! Vous avez gagné!");
    } else if (playerValue < dealerValue) {
        alert("Le croupier a gagné!");
    } else {
        alert("Égalité!");
    }
}

function getRandomCard() {
    const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return cards[Math.floor(Math.random() * cards.length)];
}

function calculateHandValue(hand) {
    let value = 0;
    let aces = 0;

    for (const card of hand) {
        if (card === 'A') {
            value += 11;
            aces += 1;
        } else if (['K', 'Q', 'J'].includes(card)) {
            value += 10;
        } else {
            value += parseInt(card);
        }
    }

    while (value > 21 && aces) {
        value -= 10;
        aces -= 1;
    }

    return value;
}

function updateBlackjackTable() {
    document.getElementById('dealer-hand').innerHTML = `<h3>Croupier</h3><p>${dealerHand.join(', ')}</p>`;
    document.getElementById('player-hand').innerHTML = `<h3>Joueur</h3><p>${playerHand.join(', ')}</p>`;
}
