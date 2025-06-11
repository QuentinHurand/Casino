function spinSlot() {
    const betAmount = parseInt(document.getElementById('bet-amount').value);

    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Veuillez entrer un montant de pari valide.");
        return;
    }

    if (betAmount > userBalance) {
        alert("Vous n'avez pas assez de fonds pour ce pari.");
        return;
    }

    updateBalance(-betAmount);

    const symbols = ['🍒', '🍋', '🍊', '🍇', '💎', '7️⃣'];
    const reels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
    ];

    document.getElementById('reel1').textContent = reels[0];
    document.getElementById('reel2').textContent = reels[1];
    document.getElementById('reel3').textContent = reels[2];

    if (reels[0] === reels[1] && reels[1] === reels[2]) {
        const winnings = betAmount * 10;
        updateBalance(winnings);
        alert(`Félicitations! Vous avez gagné ${winnings} €!`);
    }
}
