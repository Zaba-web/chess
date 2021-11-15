import Board from "../src/Board";
import FigureMovementController from "../src/FigureMovementController";
import Horse from "../src/Figures/Horse";
import { CellCoordinates } from "../src/Typedefs";

describe("Figure Movement controller: ", ()=>{
    let movementController: FigureMovementController;
    let board: Board;

    beforeEach(()=>{
        board = new Board();
        movementController = new FigureMovementController(board);
    })
    
    test("should make a move", ()=>{
        const whiteHorsePosition: CellCoordinates = {
            row: 7,
            column: 6
        };

        const newWhiteHorsePosition: CellCoordinates = {
            row: 5,
            column: 7
        }

        movementController.makeMove(whiteHorsePosition, newWhiteHorsePosition);

        expect(board.getCellContainment(newWhiteHorsePosition)).toBeInstanceOf(Horse);
        expect(board.getCellContainment(whiteHorsePosition)).toBeFalsy();
    });

    test("should not make a move", ()=>{
        const whiteHorsePosition: CellCoordinates = {
            row: 7,
            column: 6
        };

        const newWhiteHorsePosition: CellCoordinates = {
            row: 6,
            column: 4
        }

        const result = movementController.makeMove(whiteHorsePosition, newWhiteHorsePosition);

        expect(result).toBeFalsy();
    });
});