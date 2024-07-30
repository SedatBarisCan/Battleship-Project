export default function GameBoard () {
    return {
        board: Array.from({ length: 10 }, () => Array(10).fill(0)),

        ships: [],

        placeShip: function (coords, direction = "horizontal", ship) {
            const [x, y] = coords;

            //this section checks if placement is valid

            if ( direction === "horizontal" ) {
                

                if ( y + ship.length > 10 ) {
                    console.warn('Warning: Placement goes out of bounds. No modifications made.');
                    return;
                }

                for (let i = y; i < y + ship.length; i++) {
                    if( this.board[x][i] !== 0 ) {
                        console.warn('Warning: Placement overlaps. No modifications made.');
                        return;
                    }
                    //this variables check placement is valid
                    //let isValid = this.board[x+1][i]&&this.board[x][i+1]&&this.board[x+1][i+1]&&this.board[x+1][i]&&this.board[x][i-1]&&this.board[x-1][i]&&this.board[x-1][i-1]

    
                }

                // this section implements ship to gameboard
                for (let i = y; i < y + ship.length; i++) {
                    this.board[x][i] = ship;
                }
                this.ships.push(ship);


            }

            if ( direction === "vertical" ) {
                if ( x + ship.length > 10 ) {
                    console.warn('Warning: Placement goes out of bounds. No modifications made.');
                    return;
                }

                for (let i = x; i < x + ship.length; i++) {
                    if( this.board[i][y] !== 0 ) {
                        console.warn('Warning: Placement overlaps. No modifications made.');
                        return;
                    }
    
                }

                // this section implements ship to gameboard
                for (let i = x; i < x + ship.length; i++) {
                    this.board[i][y] = ship;
                }
                this.ships.push(ship);

            }
        },
        receiveAttack: function (coords) {//use callback function to render on each hit
            let target = this.board[coords[0]][coords[1]];
            
            if ( target === undefined ) {
                console.warn('Coordinates out of bounds');
                return;
            }
            if (target && target !==0 && target !=="miss" && target !== "hit") {
                target.hit();
                target.isSunk();
                
                this.isGameOver();

                this.board[coords[0]][coords[1]] = "hit";
                if (target.sunk) {
                    console.log(`${target.name} has sunk!`)
                }
                
            } else if ( target === 0 ) {
                this.board[coords[0]][coords[1]] = "miss";
            }
        },
        isGameOver: function () {
            return this.ships.every(ship => ship.sunk);
        },

    }
}
