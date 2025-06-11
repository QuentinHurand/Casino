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

        ctx.fillStyle = '#FFF';
        ctx.font = '12px Arial';
        ctx.fillText(i.toString(), x, y);
    }
}

function placeRouletteBet() {
    const betAmount = parseInt(document.getElementById('bet-amount').value);
    const betNumber = parseInt(document.getElementById('bet-number').value);

    if (isNaN(betAmount) || isNaN(betNumber) || betAmount <= 0 || betNumber < 0 || betNumber > 36) {
        alert("Veuillez entrer un montant et un numéro de pari valides.");
        return;
    }

    if (betAmount > userBalance) {
        alert("Vous n'avez pas assez de fonds pour ce pari.");
        return;
    }

    updateBalance(-betAmount);
    const winningNumber = Math.floor(Math.random() * 37);

    setTimeout(() => {
        alert(`La roue s'arrête sur le numéro : ${winningNumber}`);
        if (winningNumber === betNumber) {
            const winnings = betAmount * 36;
            updateBalance(winnings);
            alert(`Félicitations! Vous avez gagné ${winnings} €!`);
        }
    }, 2000);
}
