import GameBoard from './gameBoard';


export default function Player (name, boardNumber) {
    return {
        gameBoard: GameBoard(),
        name: name,
        boardNumber: boardNumber
    }
}