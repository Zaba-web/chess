import Board from "../src/Board";

describe("Board class shuld:", ()=>{
    
    const board = new Board();

    test("has rows and columns properties be setted", ()=>{
        expect(board.rowsCount).not.toBeFalsy();
        expect(board.columnsCount).not.toBeFalsy();
    });
});