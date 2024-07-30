function renderBoard (player, resetPlayer) {//renders board at start and reset
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            let enemyCells = document.querySelector(`div[data-x="${row}"][data-y="${col}"][data-player="1"]`);
            enemyCells.style.backgroundColor = "white";
            if (player.boardNumber === 0) {
                let playerCells = document.querySelector(`div[data-x="${row}"][data-y="${col}"][data-player="0"]`);
                playerCells.style.backgroundColor = "white";

                if (player && resetPlayer !== "reset") {//render if there is player
                    if (typeof player.gameBoard.board[row][col] === 'object') {
                        playerCells.style.backgroundColor = "darkGreen";
                    }
                }
            }
        }
    }
}

function renderAttack (target, hitOrMiss) {//renders each attack

    if (hitOrMiss === "hit") {
        target.style.backgroundColor = 'red';
    } else if (hitOrMiss === "miss") {
        target.style.backgroundColor = 'lightBlue';
    }
}

function renderWinner (winner) {
    const winnerDisplay = document.getElementById('winner');

    winnerDisplay.textContent = `Winner is ${winner}`;
    
}

function renderStatus (status) {
    const statusDisplay = document.getElementById('message');

    statusDisplay.textContent = status;
}
export {renderBoard, renderAttack, renderWinner, renderStatus}