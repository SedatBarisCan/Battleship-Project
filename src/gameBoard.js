export default function GameBoard () {
    return {
        board: Array.from({ length: 10 }, () => Array(10).fill(0)),

        ships: [],

        placeShip: function (coords, direction = "horizontal", ship) {

            //this section checks if placement is valid
            if (coords[1] + ship.length > 10 || coords[0] + ship.length > 10 ) {
                console.warn('Warning: Placement goes out of bounds. No modifications made.');
                return;
            }

            for (let i = coords[1]; i < coords[1] + ship.length; i++) {
                if( this.board[coords[0]][i] !== 0 ) {
                    console.warn('Warning: Placement overlaps. No modifications made.');
                    return;
                }

            }

            for (let i = coords[0]; i < coords[0] + ship.length; i++) {
                if( this.board[i][coords[1]] !== 0 ) {
                    console.warn('Warning: Placement overlaps. No modifications made.');
                    return;
                }

            }

            // this section implements ship to gameboard
            if ( direction === "horizontal" ) {
                for (let i = coords[1]; i < coords[1] + ship.length; i++) {
                    this.board[coords[0]][i] = ship;
                }
                this.ships.push(ship);
            }

            if ( direction === "vertical" ) {
                for (let i = coords[0]; i < coords[0] + ship.length; i++) {
                    this.board[i][coords[1]] = ship;
                }
                this.ships.push(ship);
            }
        },
        receiveAttack: function (coords, callback) {//use callback function to render on each hit
            let target = this.board[coords[0]][coords[1]];
            
            if ( target === undefined ) {
                console.warn('Coordinates out of bounds');
                return;
            }
            if (target && target !==0 && target !=="miss") {
                target.hit();
                target.isSunk();
                
                this.isGameOver();

                callback();
                this.board[coords[0]][coords[1]] = "hit";
                if (target.sunk) {
                    console.log(`${target.name} has sunk!`)
                }
                
            } else if ( target === 0 ) {
                callback();
                this.board[coords[0]][coords[1]] = "miss";
            }
        },
        isGameOver: function () {
            return this.ships.every(ship => ship.sunk);
        }

    }
}
