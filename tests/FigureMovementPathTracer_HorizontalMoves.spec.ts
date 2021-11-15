import Board from "../src/Board";
import FigureMovementPathTracer from "../src/FigureMovementPathTracer";

describe("Figure Movement controller, horizontal moves: ", ()=>{
    let pathTracer: FigureMovementPathTracer;
    let board: Board;

    beforeEach(()=>{
        board = new Board();
        pathTracer = new FigureMovementPathTracer(board);
    })

    test("right move should be impossible", ()=>{
        const startCell = {row: 7, column: 0};
        const targetCell = {row: 7, column: 3};

        expect(pathTracer.isRightMovePossible(startCell, targetCell, 3)).toBeFalsy();
    });

    test("right move should be possible", ()=>{
        const startCell = {row: 7, column: 0};
        const targetCell = {row: 5, column: 5};

        board.setFigurePosition(startCell, {row: 5, column: 0});

        expect(pathTracer.isRightMovePossible({row: 5, column: 0}, targetCell, 5)).toBeTruthy();
    });

    test("left move should be impossible", ()=>{
        const startCell = {row: 7, column: 7};
        const targetCell = {row: 7, column: 3};

        expect(pathTracer.isLeftMovePossible(startCell, targetCell, 5)).toBeFalsy();
    });
    
    test("left move should be possible", ()=>{
        const startCell = {row: 7, column: 7};
        const targetCell = {row: 5, column: 5};

        board.setFigurePosition(startCell, {row: 5, column: 0});

        expect(pathTracer.isLeftMovePossible({row: 5, column: 0}, targetCell, 2)).toBeTruthy();
    });

});