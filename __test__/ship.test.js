import Ship from "../src/ship";

describe('ship factory function tests', () => {
    let ship;

    beforeEach(() => {
        ship = Ship(3); // Create a new ship with length 3
    });

    test('should initialize with the correct length', () => {
        expect(ship.length).toBe(3);
    });

    test('should initialize with hitCount of 0', () => {
        expect(ship.hitCount).toBe(0);
    });

    test('should initialize with sunk set to false', () => {
        expect(ship.sunk).toBe(false);
    });

    test('hit should increment hitCount', () => {
        ship.hit();
        expect(ship.hitCount).toBe(1);
        ship.hit();
        expect(ship.hitCount).toBe(2);
    });

    test('isSunk should correctly update sunk status based on hitCount', () => {
        ship.hit();
        ship.isSunk();
        expect(ship.sunk).toBe(false);
    
        ship.hit();
        ship.isSunk();
        expect(ship.sunk).toBe(false);
    
        ship.hit();
        ship.isSunk();
        expect(ship.sunk).toBe(true);
    });

})