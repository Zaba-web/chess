import * as exp from "constants";
import Board from "../src/Board";
import Figure from "../src/Figures/Figure";
import {Cell} from "../src/Typedefs";

describe("Board class should:", ()=>{
    let board = new Board();
    
    beforeEach(()=>{
        let board = new Board();
    });

    test("return rows and columns properties", ()=>{
        expect(board.rowsCount).not.toBeFalsy();
        expect(board.columnsCount).not.toBeFalsy();
    });

    test("return an array of cells", ()=>{
        const testCell: Cell = false;
        expect(board.state.length).toEqual(board.rowsCount);
        expect(board.state[1].length).toEqual(board.columnsCount);
    });

    test("contain valid cellOffset", ()=>{
        expect(typeof board.cellOffset).toEqual("number");
        expect(board.cellOffset).toBeGreaterThan(0);
    });

    test("return value that contains selected cell on a board", ()=>{
        expect(board.getCellContainment(0, 0)).toBeInstanceOf(Figure); // cell that contains a figure after initialization
        expect(board.getCellContainment(4, 4)).toBeFalsy(); // empty cell
    });

    test("move pawn from 6 0 to 5 0", ()=>{
        board.tryToMakeMove(6, 0, 5, 0);

        expect(board.getCellContainment(6, 0)).toBeFalsy();
        expect(board.getCellContainment(5, 0)).toBeInstanceOf(Figure);
    });
});