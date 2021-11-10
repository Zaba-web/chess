import Board from "./Board";
import Figure from "./Figures/Figure";
import { MoveDirection } from "./Typedefs";

export default class FigureMovementController {
    private board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    /**
     * Initializes process of making a move
     * @param currentRow row that selected figure stands on
     * @param currentColumn column that selected figure stands on
     * @param newRow target row
     * @param newColumn target column
     */
    public setFigurePosition(currentRow: number, currentColumn: number, newRow: number, newColumn: number): boolean {
        const figureToMove = this.board.state[currentRow][currentColumn] as Figure;

        figureToMove.setPosition(newRow, newColumn, this.board.cellOffset);

        this.board.state[currentRow][currentColumn] = false;
        this.board.state[newRow][newColumn] = figureToMove;

        return true;
    }

    private determinateMoveDirection(targetRow: number, targetColumn: number, figure: Figure): MoveDirection {
        const rowDifference = targetRow - figure.position.row;
        const columnDifference = targetColumn - figure.position.column;

        if (columnDifference == 0 && rowDifference < 0) {
            return MoveDirection.Forward;
        }

        if (columnDifference == 0 && rowDifference > 0) {
            return MoveDirection.Back;
        }

        if (columnDifference > 0 && rowDifference == 0) {
            return MoveDirection.Right;
        }

        if (columnDifference < 0 && rowDifference == 0) {
            return MoveDirection.Left;
        }

    }
}