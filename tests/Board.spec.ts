import Board from "../src/Board";
import Figure from "../src/Figures/Figure";
import {Cell, CellCoordinates} from "../src/Typedefs";

describe("Board class:", ()=>{
    let board = new Board();
    
    beforeEach(()=>{
        board = new Board();
    });

    test("return rows and columns properties", ()=>{
        expect(board.rowsCount).not.toBeFalsy();
        expect(board.columnsCount).not.toBeFalsy();
    });

    test("return an array of cells", ()=>{
        expect(board.state.length).toEqual(board.rowsCount);
        expect(board.state[1].length).toEqual(board.columnsCount);
    });

    test("contain valid cellOffset", ()=>{
        expect(typeof board.cellOffset).toEqual("number");
        expect(board.cellOffset).toBeGreaterThan(0);
    });

    test("getCellContainment return value that contains selected cell on a board", ()=>{
        const cellWithFigure: CellCoordinates = {row: 1, column: 0};
        const emptyCell: CellCoordinates = {row: 4, column: 4};

        expect(board.getCellContainment(cellWithFigure)).toBeInstanceOf(Figure); // cell that contains a figure after initialization
        expect(board.getCellContainment(emptyCell)).toBeFalsy(); // empty cell
    });

    test("isCellCaptured return true", ()=>{
        const cell: CellCoordinates = {row: 1, column: 0};
        expect(board.isCellCaptured(cell)).toBeTruthy();
    });

    test("isCellCaptured return false", ()=>{
        const cell: CellCoordinates = {row: 4, column: 4};
        expect(board.isCellCaptured(cell)).toBeFalsy();
    });

    test("figure should be moved", ()=>{
        const cell: CellCoordinates = {row: 1, column: 0};
        expect(board.isCellCaptured(cell)).toBeTruthy();

        const newCell: CellCoordinates = {row: 2, column: 0}
        board.setFigurePosition(cell, newCell);

        expect(board.isCellCaptured(cell)).toBeFalsy();
    });
});