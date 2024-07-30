import { renderAttack, renderWinner, renderStatus } from './render';
import Player from './player';
import Ship
 from './ship';
function gameController () {
    return {
        player: null,
        enemy: null,

        currentPlayer: null,

        startGame: function (playerName, enemyName, isRandom) {
            this.player = Player(playerName, 0);
            this.enemy = Player(enemyName, 1);
            this.currentPlayer = this.player;


            //check if there is any ships placed if it is remove 
            this.player.gameBoard.ships = [];
            this.enemy.gameBoard.ships = [];

            //player ships
            const Carrier = Ship(5, "Carrier");
	        const Battleship = Ship(4, "Battleship");
            const Destroyer	= Ship(3, "Destroyer");
	        const Submarine	= Ship(3, "Submarine");
	        const PatrolBoat = Ship(2, "Patrol Boat");

            //enemy ships
            const Carrier2 = Ship(5, "Carrier");
            const Battleship2 = Ship(4, "Battleship");
            const Destroyer2 = Ship(3, "Destroyer");
            const Submarine2 = Ship(3, "Submarine");
            const PatrolBoat2 = Ship(2, "Patrol Boat");
    
            if (isRandom === "random") {
                this.placeShipRandomly(this.player.gameBoard, Carrier)
                this.placeShipRandomly(this.player.gameBoard, Battleship)
                this.placeShipRandomly(this.player.gameBoard, Destroyer)
                this.placeShipRandomly(this.player.gameBoard, Submarine)
                this.placeShipRandomly(this.player.gameBoard, PatrolBoat);


                this.placeShipRandomly(this.enemy.gameBoard, Carrier2)
                this.placeShipRandomly(this.enemy.gameBoard, Battleship2)
                this.placeShipRandomly(this.enemy.gameBoard, Destroyer2)
                this.placeShipRandomly(this.enemy.gameBoard, Submarine2)
                this.placeShipRandomly(this.enemy.gameBoard, PatrolBoat2);
            }
        },

        switchTurn: function () {
            this.currentPlayer = this.currentPlayer === this.player ? this.enemy : this.player;
        },

        handleMove: function (event) {
            const enemy = this.currentPlayer === this.player ? this.enemy : this.player;

            if (event.target.tagName === 'DIV' && event.target.dataset.status !== "used") {
                const x = event.target.dataset.x;
                const y = event.target.dataset.y;
                enemy.gameBoard.receiveAttack([x, y]);
        
                if (enemy.gameBoard.board[x][y] === "hit") {
                    renderAttack(event.target, "hit")
                    event.target.dataset.status = "used";
                    renderStatus("Hit!");
        
                    if (this.isGameOver(enemy)) {
                        this.updateBoardClickability("gameOver")
                        return;
                    }
        
                } else if (enemy.gameBoard.board[x][y] === "miss") {
                    event.target.dataset.status = "used";
                    renderAttack(event.target, "miss")
                    renderStatus("Miss");
                    if (enemy.name === "Computer") {// checks if is it player vs computer
                        this.handleComputerMove();
                    } else {
                        this.switchTurn();
                        this.updateBoardClickability();
                    }


                }  
            }
        
        },

        handleComputerMove: function () {//sorunlu tekraar değişecek düzenlenecek

            const enemy = this.player

            let isCorrectMove = false;

            while (!isCorrectMove) {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);

                const target = document.querySelector(`div[data-x="${x}"][data-y="${y}"][data-player="0"]`)

                if (target.dataset.status !== "used") {
                    enemy.gameBoard.receiveAttack([x, y]);
                    isCorrectMove = true;
                    if (enemy.gameBoard.board[x][y] === "hit") {
                        renderAttack(target, "hit")
                        target.dataset.status = "used";
                        renderStatus("Hit!");
            
                        if (this.isGameOver(enemy)) {
                            this.updateBoardClickability("gameOver")
                            return;
                        }
            
                    } else if (enemy.gameBoard.board[x][y] === "miss") {
                        target.dataset.status = "used";
                        renderAttack(target, "miss");
                        renderStatus("Miss");
                    }
                }    
            }
            
            
        },

        placeShipRandomly: function (gameBoard, ship) {
                let placed = false;
                while (!placed) {
                    const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
                    const x = getRandomInt(10);
                    const y = getRandomInt(10);
                    if (canPlaceShip([x,y], direction, ship.length, gameBoard.board)) {
                        gameBoard.placeShip([x, y], direction, ship);
                        placed = true;
                    }
                }
            
            function canPlaceShip (coords, direction, length, board) {
                if ( direction === "horizontal" ) {
                    if ( coords[1] + length > 10 ) return false;
            
                    for (let i = coords[1]; i < coords[1] + length; i++) {
                        if( board[coords[0]][i] !== 0 ) return false;
                    }
                } else {
                    if ( coords[0] + length > 10 ) return false;
            
                    for (let i = coords[0]; i < coords[0] + length; i++) {
                        if( board[i][coords[1]] !== 0 ) return false;
            
                    }
                }
                return true;
            }
            
            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }
            
        },
        isGameOver: function (enemy) {
            if (enemy.gameBoard.isGameOver()) {
                renderWinner(this.currentPlayer.name)
                return true;
            }
            return false;
        },
        

        updateBoardClickability: function(condition) {
            const playerTable = document.querySelector(`table[data-board="user"]`);
            const enemyTable = document.querySelector(`table[data-board="enemy"]`);

            if (condition ==="gameOver") {
                playerTable.classList.add("disabled");
                enemyTable.classList.add("disabled");
                return;
            } else if (condition === "reset") {
                enemyTable.classList.remove("disabled");
                playerTable.classList.remove("disabled");
                //delete all div status 
                enemyTable.querySelectorAll('div').forEach(cell => {
                    cell.dataset.status = "";
                });
                playerTable.querySelectorAll('div').forEach(cell => {
                    cell.dataset.status = "";
                });
                return;
            } else if (condition === "computer") {
                playerTable.classList.add("disabled");
                enemyTable.classList.remove("disabled");
                return;
            }
            
            if (this.currentPlayer === this.player) {
                playerTable.classList.add("disabled");
                enemyTable.classList.remove("disabled");
            } else {
                enemyTable.classList.add("disabled");
                playerTable.classList.remove("disabled");
            }
        },

    }
}




export { gameController};