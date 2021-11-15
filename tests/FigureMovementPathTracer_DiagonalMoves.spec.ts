import Board from "../src/Board";
import FigureMovementPathTracer from "../src/FigureMovementPathTracer";

describe("Figure Movement controller, diagonal moves: ", ()=>{
    let pathTracer: FigureMovementPathTracer;
    let board: Board;

    beforeEach(()=>{
        board = new Board();
        pathTracer = new FigureMovementPathTracer(board);
    })

    test("↖ move should be impossible", ()=>{
        const startCell = {row: 7, column: 2};
        const targetCell = {row: 5, column: 0};

        expect(pathTracer.isDiagonalTopLeftMovePossible(startCell, targetCell, 2)).toBeFalsy();
    });

    test("↖ move should be possible", ()=>{
        const startCell = {row: 7, column: 2};
        const targetCell = {row: 5, column: 0};

        board.setFigurePosition({row: 6, column: 1}, {row: 4, column: 3});

        expect(pathTracer.isDiagonalTopLeftMovePossible(startCell, targetCell, 2)).toBeTruthy();
    });

    test("↗ move should be impossible", ()=>{
        const startCell = {row: 7, column: 2};
        const targetCell = {row: 5, column: 4};

        expect(pathTracer.isDiagonalTopRightMovePossible(startCell, targetCell, 2)).toBeFalsy();
    });

    test("↗ move should be possible", ()=>{
        const startCell = {row: 7, column: 2};
        const targetCell = {row: 5, column: 4};

        board.setFigurePosition({row: 6, column: 3}, {row: 4, column: 3});

        expect(pathTracer.isDiagonalTopRightMovePossible(startCell, targetCell, 2)).toBeTruthy();
    });

    test("↘ move should be impossible", ()=>{
        const startCell = {row: 0, column: 2};
        const targetCell = {row: 2, column: 0};

        expect(pathTracer.isDiagonalBottomRightMovePossible(startCell, targetCell, 2)).toBeFalsy();
    });

    test("↘ move should be possible", ()=>{
        const startCell = {row: 0, column: 2};
        const targetCell = {row: 2, column: 4};

        board.setFigurePosition({row: 1, column: 3}, {row: 4, column: 3});

        expect(pathTracer.isDiagonalBottomRightMovePossible(startCell, targetCell, 2)).toBeTruthy();
    });

    test("↙ move should be impossible", ()=>{
        const startCell = {row: 0, column: 5};
        const targetCell = {row: 7, column: 3};

        expect(pathTracer.isDiagonalBottomLeftMovePossible(startCell, targetCell, 2)).toBeFalsy();
    });

    test("↙ move should be possible", ()=>{
        const startCell = {row: 0, column: 5};
        const targetCell = {row: 7, column: 3};

        board.setFigurePosition({row: 1, column: 4}, {row: 4, column: 3});

        expect(pathTracer.isDiagonalBottomLeftMovePossible(startCell, targetCell, 2)).toBeTruthy();
    });

});