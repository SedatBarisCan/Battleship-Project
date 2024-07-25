import GameBoard from "../src/gameBoard";
import Ship from "../src/ship";

describe('GameBoard factory function tests', () => {
    let gameBoard;

    beforeEach(() => {
        gameBoard = GameBoard();
    });

    function createMockShip(length) {
        return {
            length,
            hit: jest.fn(),
            isSunk: jest.fn(),
            sunk: false,
        }
    };

    //to mock callback function
    const mockCallback = jest.fn();

    test('should place ships at specific coordinates with ship factory function', () => {

        

        let ship1 = createMockShip(5, "Carrier");
        gameBoard.placeShip([0, 0], 'horizontal', ship1);

        expect(gameBoard.board[0][0]).toBe(ship1);
        expect(gameBoard.board[0][1]).toBe(ship1);
        expect(gameBoard.board[0][2]).toBe(ship1);
    });

    
    test('should place a ship vertically', () => {
        const ship2 = createMockShip(3);
        gameBoard.placeShip([0, 0], 'vertical', ship2);

        expect(gameBoard.board[0][0]).toBe(ship2);
        expect(gameBoard.board[1][0]).toBe(ship2);
        expect(gameBoard.board[2][0]).toBe(ship2);
    });

    test('should not place a ship out of bounds horizontally', () => {
        const ship = createMockShip([11]); // Ship length exceeds board width
        gameBoard.placeShip([0, 0], 'horizontal', ship);

        expect(gameBoard.board[0][0]).toBe(0);
    });

    test('should not place a ship out of bounds vertically', () => {
        const ship = createMockShip(11); // Ship length exceeds board height
        gameBoard.placeShip([0, 0], 'vertical', ship);

        expect(gameBoard.board[0][0]).toBe(0);
    });

    test('should not place a ship where another ship already exists (vertical overlap)', () => {
        const ship1 = createMockShip(4, "Battleship");
        const ship2 = createMockShip(2, "Destroyer");

        // Place the first ship
        gameBoard.placeShip([0, 0], 'vertical', ship1);

        // Attempt to place a second ship overlapping with the first one
        gameBoard.placeShip([1, 0], 'vertical', ship2);

        // Ensure the second ship was not placed
        expect(gameBoard.board[0][0]).toBe(ship1);
        expect(gameBoard.board[1][0]).toBe(ship1);
        expect(gameBoard.board[2][0]).toBe(ship1);
        expect(gameBoard.board[3][0]).toBe(ship1);
        expect(gameBoard.board[1][0]).not.toBe(ship2);
        expect(gameBoard.board[2][0]).not.toBe(ship2);
    });

///////////////////---------------------------------
    test('should mark a ship as hit and call hit method on the ship', () => {
        const ship = createMockShip(3, "Destroyer");
        gameBoard.placeShip([0, 0], 'horizontal', ship);

        gameBoard.receiveAttack([0, 0], mockCallback);

        expect(gameBoard.board[0][0]).toBe("hit");
        expect(ship.hit).toHaveBeenCalled();
    });

    test('should record missed attacks and mark them as miss', () => {
        const mockCallback = jest.fn();
        gameBoard.receiveAttack([5, 5], mockCallback);
    
        expect(gameBoard.board[5][5]).toBe("miss");
    });
    
    test('should handle multiple missed attacks correctly', () => {
        const mockCallback = jest.fn();
        gameBoard.receiveAttack([5, 5], mockCallback);
        gameBoard.receiveAttack([6, 6], mockCallback); // Different coordinate
    
        expect(gameBoard.board[5][5]).toBe("miss");
        expect(gameBoard.board[6][6]).toBe("miss");
    });
    

    test('should report game over when all ships are sunk', () => {
        const ship1 = Ship(2, "Submarine");
        const ship2 = Ship(3, "Battleship");

        gameBoard.placeShip([0, 0], 'horizontal', ship1);
        gameBoard.placeShip([1, 0], 'vertical', ship2);

        gameBoard.receiveAttack([0, 0], mockCallback);
        gameBoard.receiveAttack([0, 1], mockCallback);
        gameBoard.receiveAttack([1, 0], mockCallback);
        gameBoard.receiveAttack([2, 0], mockCallback);
        gameBoard.receiveAttack([3, 0], mockCallback);

        expect(ship1.sunk).toBe(true);
        expect(ship2.sunk).toBe(true);

        expect(gameBoard.isGameOver()).toBe(true);
    });

    test('should not report game over if some ships are not sunk', () => {
        const ship1 = createMockShip(2, "Submarine");
        const ship2 = createMockShip(3, "Battleship");

        ship1.isSunk.mockReturnValue(false); // Ship 1 is not sunk
        ship2.isSunk.mockReturnValue(true);  // Ship 2 is sunk

        gameBoard.placeShip([0, 0], 'horizontal', ship1);
        gameBoard.placeShip([1, 0], 'vertical', ship2);

        gameBoard.receiveAttack([0, 0], mockCallback);
        gameBoard.receiveAttack([0, 1], mockCallback);
        gameBoard.receiveAttack([1, 0], mockCallback);
        gameBoard.receiveAttack([2, 0], mockCallback);

        expect(gameBoard.isGameOver()).toBe(false);
    });
})