/*
Improvements

make ship placement better so it shouldnt palce near ship 

*/



import './style.css';
import Ship from './ship';
import GameBoard from './gameBoard';
import Player from './player';
import { renderAttack, renderBoard } from './render';
import { setupGame, handleClick, isGameOver } from './gameLogic';
import { gameController } from './gameLogic';

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById("start-button");
    const resetBtn = document.getElementById("reset-button");
    const randomBtn = document.getElementById('random');
    const modeSelectBtn = document.getElementById('submit-mode');

    startBtn.disabled = true;
    resetBtn.disabled = true;
    randomBtn.disabled = true;

    let game;
    let playerMove;
    let enemyMove;

    startBtn.addEventListener('click', () => {
        if (game.enemy.name === "Computer") {
            playerMove = game.handleMove.bind(game);
            enemyMove = game.handleComputerMove.bind(game);
            game.updateBoardClickability("computer");
        } else {
            playerMove = game.handleMove.bind(game);
            enemyMove = game.handleMove.bind(game);
            game.updateBoardClickability();
        }
        


        const status = document.getElementById('message');
        status.textContent = "Make your move!";

        startBtn.disabled = true;
        randomBtn.disabled = true;
        resetBtn.disabled = false

        addTableEventListeners(playerMove, enemyMove);
    });

    resetBtn.addEventListener('click', () => {
        const gameModeContainer = document.getElementById('select-mode-container');
        gameModeContainer.style.display = 'block';

        renderBoard(game.player, "reset")
        renderBoard(game.enemy)

        game.updateBoardClickability("reset")
        

        removeTableEventListeners(playerMove, enemyMove);

        startBtn.diabled = true;
        resetBtn.disabled = true;
        randomBtn.disabled = true;
    });

    randomBtn.addEventListener('click', () => {
        if (game.enemy.name === "Computer") {
            game.startGame("Player", "Computer", "random");
            renderBoard(game.player);
        } else {
            game.startGame("Player 1", "Player 2", "random");
            renderBoard(game.player);
        }
    });

    modeSelectBtn.addEventListener('click', () => {
        const modes = document.getElementsByName('gameMode');

        let selectedMode;

        for (const mode of modes) {
            if (mode.checked) {
                selectedMode = mode.value;
                break;
            }
        }

        game = gameController();


        if (selectedMode === "PVC") {
            game.startGame("Player", "Computer", "random");

        } else if (selectedMode === "PVP") {
            game.startGame("Player 1", "Player 2", "random");
        }

        renderBoard(game.player);

        randomBtn.disabled = false;
        startBtn.disabled = false;

        const gameModeContainer = document.getElementById('select-mode-container');
        gameModeContainer.style.display = 'none';
    })



});

//event Listeners
function addTableEventListeners (playerMove, enemyMove) {
    const enemyTable = document.querySelector(`table[data-board="enemy"]`)
    enemyTable.addEventListener('click', playerMove);

    const playerTable = document.querySelector(`table[data-board="user"]`);
    playerTable.addEventListener('click', enemyMove);
    

}

function removeTableEventListeners(playerMove, enemyMove) {
    const enemyTable = document.querySelector(`table[data-board="enemy"]`)
    enemyTable.removeEventListener('click', playerMove);

    const playerTable = document.querySelector(`table[data-board="user"]`);
    playerTable.removeEventListener('click', enemyMove);
}