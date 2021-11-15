import Board from "../src/Board";
import FigureMovementPathTracer from "../src/FigureMovementPathTracer";

describe("Figure Movement controller, vertical moves: ", ()=>{
    let pathTracer: FigureMovementPathTracer;
    let board: Board;

    beforeEach(()=>{
        board = new Board();
        pathTracer = new FigureMovementPathTracer(board);
    })

    test("forward move should be possible", ()=>{
        const startCell = {row: 6, column: 0};
        const targetCell = {row: 4, column: 0};

        expect(pathTracer.isForwardMovePossible(startCell, targetCell, 2)).toBeTruthy();
    });

    test("forward move should be impossible", ()=>{
        const startCell = {row: 7, column: 0};
        const targetCell = {row: 3, column: 0};

        expect(pathTracer.isForwardMovePossible(startCell, targetCell, 4)).toBeFalsy();
    });

    test("back move should be possible", ()=>{
        const startCell = {row: 1, column: 0};
        const targetCell = {row: 3, column: 0};

        expect(pathTracer.isBackMovePossible(startCell, targetCell, 2)).toBeTruthy();
    });

    test("back move should be impossible", ()=>{
        const startCell = {row: 0, column: 0};
        const targetCell = {row: 3, column: 0};

        expect(pathTracer.isBackMovePossible(startCell, targetCell, 3)).toBeFalsy();
    });
});