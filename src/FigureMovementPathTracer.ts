import { start } from "repl";
import Board from "./Board";

import Figure from "./Figures/Figure";
import { CellCoordinates, MoveDirection } from "./Typedefs";

export default class FigureMovementPathTracer {
    private board: Board;

    constructor (board: Board) {
        this.board = board;
    }

    public isForwardMovePossible(startCell: CellCoordinates, moveLength: number): boolean {
        return this.isVerticalMovePossible(startCell, moveLength, MoveDirection.Forward);
    }

    public isBackMovePossible(startCell: CellCoordinates, moveLength: number): boolean {
        return this.isVerticalMovePossible(startCell, moveLength, MoveDirection.Back);
    }

    public isRightMovePossible(startCell: CellCoordinates, moveLength: number): boolean {
        return this.isHorizontalMovePossible(startCell, moveLength, MoveDirection.Right);
    }

    public isLeftMovePossible(startCell: CellCoordinates, moveLength: number): boolean {
        return this.isHorizontalMovePossible(startCell, moveLength, MoveDirection.Left);
    }

    private isVerticalMovePossible(startCell: CellCoordinates, moveLength: number, direction: MoveDirection): boolean {
        const moveDirectionOffset = direction == MoveDirection.Forward ? -1 : 1;

        let currentRow = startCell.row + moveDirectionOffset;
        let movePossible = true;
        const column = startCell.column;
        const moveLimit = currentRow - moveLength;

        let limitNotReached: boolean;

        const calculateLoopProgress = () => {
            limitNotReached = direction == MoveDirection.Forward ? currentRow > moveLimit : currentRow < moveLimit;
        }

        calculateLoopProgress();

        while (limitNotReached) {
            let notTargetCell = direction == MoveDirection.Forward ? currentRow > moveLimit + 1 : currentRow < moveLimit - 1;

            if(notTargetCell && this.board.state[currentRow][column] instanceof Figure) {
                movePossible = false;
            }

            currentRow += moveDirectionOffset;
            calculateLoopProgress();
        }

        return movePossible;
    }

    public isHorizontalMovePossible(startCell: CellCoordinates, moveLength: number, direction: MoveDirection): boolean {
        const moveDirectionOffset = direction == MoveDirection.Left ? -1 : 1;

        let currentColumn = startCell.column + moveDirectionOffset;
        let movePossible = true;
        const row = startCell.row;
        const moveLimit = currentColumn - moveLength;

        let limitNotReached: boolean;

        const calculateLoopProgress = () => {
            limitNotReached = direction == MoveDirection.Left ? currentColumn > moveLimit : currentColumn < moveLimit;
        }

        while (limitNotReached) {
            let notTargetCell = direction == MoveDirection.Left ? currentColumn > moveLimit + 1 : currentColumn < moveLimit - 1;

            if(notTargetCell && this.board.state[row][currentColumn] instanceof Figure) {
                movePossible = false;
            }

            currentColumn += moveDirectionOffset;
            calculateLoopProgress();
        }

        return movePossible;
    }
}