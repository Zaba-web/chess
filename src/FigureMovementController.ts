import Board from "./Board";
import Figure from "./Figures/Figure";
import FigureMovementPathTracer from "./FigureMovementPathTracer";

import { Cell, CellCoordinates, FigureColor, MoveDirection } from "./Typedefs";
import Pawn from "./Figures/Pawn";

export default class FigureMovementController {
    private board: Board;
    private pathTracer: FigureMovementPathTracer;

    constructor(board: Board) {
        this.board = board;
        this.pathTracer = new FigureMovementPathTracer(this.board);
    }

    /**
     * Initializes process of making a move
     * @param currentRow row that selected figure stands on
     * @param currentColumn column that selected figure stands on
     * @param newRow target row
     * @param newColumn target column
     */

    public makeMove(currentCell: CellCoordinates, newCell: CellCoordinates): boolean {
        const figureToMove = this.board.state[currentCell.row][currentCell.column] as Figure;
        const moveDirection = this.determinateMoveDirection(newCell.row, newCell.column, figureToMove);
        const movePatttern = figureToMove.getMovePattern();
        let moveDirectionAllowed: boolean = false;
        let madeMoveRange: number;

        const makeMove = () => {
            this.board.setFigurePosition(currentCell, newCell);
            figureToMove.moveDone();
            return true;
        }

        movePatttern.map(moveOption => {
            if (moveOption.direction == moveDirection) {
                moveDirectionAllowed = true;
                madeMoveRange = moveOption.range;
            }
        });

        
        if(figureToMove instanceof Pawn) {
            if(this.pawnCanCapture(currentCell, newCell, figureToMove.color)) {
                return makeMove();
            }
        }

        if(!moveDirectionAllowed) {
            return false;
        }

        let isPathClear = this.isMovePathClear(currentCell, newCell, moveDirection, madeMoveRange);
        const pawnTryToCaptureForward = (this.board.getCellContainment(newCell) instanceof Figure && 
                                        figureToMove instanceof Pawn);
        
        if (isPathClear && pawnTryToCaptureForward) {
            isPathClear = false;
        }

        if (isPathClear) {
            return makeMove();
        }
    }

    private isMovePathClear(startCell: CellCoordinates, targetCell: CellCoordinates, direction: MoveDirection, madeMoveRange: number): boolean {
        const currentCell = JSON.parse(JSON.stringify(startCell));

        const moveLengthByRow = Math.abs(currentCell.row - targetCell.row);
        const moveLengthByColumn = Math.abs(currentCell.column - targetCell.column);

        let pathClear: boolean;

        switch (direction) {
            case MoveDirection.Forward:
                if (madeMoveRange >= moveLengthByRow) {
                    pathClear = this.pathTracer.isForwardMovePossible(startCell, moveLengthByRow);
                }
                break;
            case MoveDirection.Back:
                if (madeMoveRange >= moveLengthByRow) {
                    pathClear = this.pathTracer.isBackMovePossible(startCell, moveLengthByRow);
                }
                break;
            case MoveDirection.Right:
                if (madeMoveRange >= moveLengthByColumn) {
                    pathClear = this.pathTracer.isRightMovePossible(startCell, moveLengthByRow);
                }
                break;
            case MoveDirection.Left:
                if (madeMoveRange >= moveLengthByColumn) {
                    pathClear = this.pathTracer.isLeftMovePossible(startCell, moveLengthByRow);
                }
                break;
        }

        return pathClear;
    }

    private pawnCanCapture(currentCell: CellCoordinates, targetCell: CellCoordinates, color: FigureColor): boolean {
        if (!(this.board.getCellContainment(targetCell) instanceof Figure)) {
            return false;
        }

        const isMoveOneCellDiagonal = (currentCell.column + 1 == targetCell.column || 
                                        currentCell.column - 1 == targetCell.column);

        let isMoveOneCellForward: boolean;

        if (color == FigureColor.White) {
            isMoveOneCellForward = currentCell.row - 1 == targetCell.row;
        } else {
            isMoveOneCellForward = currentCell.row + 1 == targetCell.row;
        }

        if(isMoveOneCellForward && isMoveOneCellDiagonal) {
            return true;
        }
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