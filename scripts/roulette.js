let userBalance = 1000;
let currentBets = {};

function updateBalance(amount) {
    userBalance += amount;
    document.getElementById('user-balance').textContent = userBalance;
}

function loadGame(game) {
    const gameContainer = document.getElementById('game-container');
    if (game === 'roulette') {
        gameContainer.innerHTML = `
            <h2>Roulette</h2>
            <canvas id="roulette-wheel" width="300" height="300"></canvas>
            <div class="roulette-table">
                <div class="bet-option" onclick="placeBet('red')">Rouge</div>
                <div class="bet-option" onclick="placeBet('black')">Noir</div>
                <div class="bet-option" onclick="placeBet('even')">Pair</div>
                <div class="bet-option" onclick="placeBet('odd')">Impair</div>
                <div class="bet-option" onclick="placeBet('1-18')">1-18</div>
                <div class="bet-option" onclick="placeBet('19-36')">19-36</div>
            </div>
            <div class="bet-controls">
                <input type="number" id="bet-amount" placeholder="Montant du pari" min="1">
                <button onclick="startSpin()">Tourner la roue</button>
            </div>
        `;
        drawRouletteWheel();
    }
}

function drawRouletteWheel() {
    const canvas = document.getElementById('roulette-wheel');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#8B4513';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.stroke();

    for (let i = 0; i < 37; i++) {
        const angle = (i * (2 * Math.PI / 37)) - Math.PI / 2;
        const x = centerX + (radius - 20) * Math.cos(angle);
        const y = centerY + (radius - 20) * Math.sin(angle);

        ctx.fillStyle = i === 0 ? '#008000' : (i % 2 === 0 ? '#FF0000' : '#000000');
        ctx.font = '12px Arial';
        ctx.fillText(i.toString(), x, y);
    }
}

function placeBet(betType) {
    const betAmount = parseInt(document.getElementById('bet-amount').value);

    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Veuillez entrer un montant de pari valide.");
        return;
    }

    if (betAmount > userBalance) {
        alert("Vous n'avez pas assez de fonds pour ce pari.");
        return;
    }

    if (!currentBets[betType]) {
        currentBets[betType] = 0;
    }

    currentBets[betType] += betAmount;
    updateBalance(-betAmount);
    alert(`Pari de ${betAmount} € placé sur ${betType}.`);
}

function startSpin() {
    const canvas = document.getElementById('roulette-wheel');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;

    let angle = 0;
    const spinAnimation = setInterval(() => {
        angle += 0.1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, angle, Math.PI * 2 + angle);
        ctx.strokeStyle = '#000';
        ctx.stroke();

        for (let i = 0; i < 37; i++) {
            const segmentAngle = (i * (2 * Math.PI / 37)) - Math.PI / 2 + angle;
            const x = centerX + (radius - 20) * Math.cos(segmentAngle);
            const y = centerY + (radius - 20) * Math.sin(segmentAngle);

            ctx.fillStyle = i === 0 ? '#008000' : (i % 2 === 0 ? '#FF0000' : '#000000');
            ctx.font = '12px Arial';
            ctx.fillText(i.toString(), x, y);
        }
    }, 100);

    setTimeout(() => {
        clearInterval(spinAnimation);
        const winningNumber = Math.floor(Math.random() * 37);
        const winningColor = winningNumber === 0 ? 'green' : (winningNumber % 2 === 0 ? 'red' : 'black');
        const winningParity = winningNumber % 2 === 0 ? 'even' : 'odd';
        const winningRange = winningNumber >= 1 && winningNumber <= 18 ? '1-18' : '19-36';

        alert(`La roue s'arrête sur le numéro : ${winningNumber} (${winningColor}, ${winningParity}, ${winningRange}).`);

        let winnings = 0;
        for (const betType in currentBets) {
            if ((betType === 'red' && winningColor === 'red') ||
                (betType === 'black' && winningColor === 'black') ||
                (betType === 'even' && winningParity === 'even') ||
                (betType === 'odd' && winningParity === 'odd') ||
                (betType === '1-18' && winningRange === '1-18') ||
                (betType === '19-36' && winningRange === '19-36')) {
                winnings += currentBets[betType] * 2;
            }
        }

        if (winnings > 0) {
            updateBalance(winnings);
            alert(`Félicitations! Vous avez gagné ${winnings} €!`);
        } else {
            alert("Désolé, vous n'avez pas gagné cette fois.");
        }

        currentBets = {};
    }, 5000);
}
