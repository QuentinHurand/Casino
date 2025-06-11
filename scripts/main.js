let userBalance = 1000;

function updateBalance(amount) {
    userBalance += amount;
    document.getElementById('user-balance').textContent = userBalance;
}

function loadGame(game) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';

    switch (game) {
        case 'roulette':
            gameContainer.innerHTML = `
                <h2>Roulette</h2>
                <canvas id="roulette-wheel" width="300" height="300"></canvas>
                <div class="bet-controls">
                    <input type="number" id="bet-amount" placeholder="Montant du pari" min="1">
                    <input type="number" id="bet-number" placeholder="Numéro (0-36)" min="0" max="36">
                    <button onclick="placeRouletteBet()">Placer un pari</button>
                </div>
            `;
            drawRouletteWheel();
            break;
        case 'blackjack':
            gameContainer.innerHTML = `
                <h2>Blackjack</h2>
                <div id="blackjack-table">
                    <div id="dealer-hand"></div>
                    <div id="player-hand"></div>
                </div>
                <div class="bet-controls">
                    <input type="number" id="bet-amount" placeholder="Montant du pari" min="1">
                    <button onclick="dealCards()">Distribuer les cartes</button>
                    <button onclick="hit()">Tirer une carte</button>
                    <button onclick="stand()">Rester</button>
                </div>
            `;
            break;
        case 'slot':
            gameContainer.innerHTML = `
                <h2>Machine à Sous</h2>
                <div id="slot-machine">
                    <div class="reel" id="reel1">🍒</div>
                    <div class="reel" id="reel2">🍒</div>
                    <div class="reel" id="reel3">🍒</div>
                </div>
                <div class="bet-controls">
                    <input type="number" id="bet-amount" placeholder="Montant du pari" min="1">
                    <button onclick="spinSlot()">Tourner</button>
                </div>
            `;
            break;
    }
}
