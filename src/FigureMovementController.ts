import Board from "./Board";
import Figure from "./Figures/Figure";
import FigureMovementPathTracer from "./FigureMovementPathTracer";

import {CellCoordinates, FigureColor, FigureMoveData, MoveDirection } from "./Typedefs";
import Pawn from "./Figures/Pawn";
import Horse from "./Figures/Horse";

/**
 * Class that moves figures on a board
 */
export default class FigureMovementController {
    private board: Board;
    private pathTracer: FigureMovementPathTracer;

    constructor(board: Board) {
        this.board = board;
        this.pathTracer = new FigureMovementPathTracer(this.board);
    }

    /**
     * Initializes process of making a move
     * @param currentCell cell that selected figure stands on
     * @param newCell target cell
     */
    public makeMove(currentCell: CellCoordinates, newCell: CellCoordinates): boolean {
        const figureToMove = this.board.getCellContainment(currentCell) as Figure;
        const moveDirection = this.determinateMoveDirection(newCell, figureToMove);
        const {moveDirectionAllowed, madeMoveRange} = this.getFigureMoveAbilityData(figureToMove, moveDirection);
   
        if(this.checkAllowedSpecialMoves(currentCell, newCell, figureToMove)) {
            return this.acceptMove(currentCell, newCell, figureToMove);
        }

        if(!moveDirectionAllowed) {
            return false;
        }

        const isPathClear = this.isMovePathClear(currentCell, newCell, moveDirection, madeMoveRange);
        const moveAllowed = this.isMoveAllowed(newCell, figureToMove);
        
        if (isPathClear && moveAllowed) {
            return this.acceptMove(currentCell, newCell, figureToMove);
        }
    }

    /**
     * Check if selected figure has uncommon moves.
     * 
     * Pawn can capture by diagonal
     * Horse has uncommon move pattern
     * King can't go to the cell that is under attack
     * @param currentCell cell with figure
     * @param newCell target cell
     * @param figureToMove figure that performs move
     * @returns 
     */
    private checkAllowedSpecialMoves (currentCell: CellCoordinates, newCell: CellCoordinates, figureToMove: Figure): boolean {
        if(figureToMove instanceof Pawn) {
            return this.pawnCanCapture(currentCell, newCell, figureToMove.color);
        }

        if(figureToMove instanceof Horse) {
            return this.horseCanMove(currentCell, newCell);
        }
        
        return false;
    }

    private isMoveAllowed (newCell: CellCoordinates, figure: Figure): boolean {
        return figure.cellSuitableForMove(this.board.isCellCaptured(newCell), this.board.isCellUnderAttack(newCell));
    }

    /**
     * Check if move that player tries to make is supported by selected figure
     * 
     * @param figure 
     * @param moveDirection 
     * @returns 
     */
    private getFigureMoveAbilityData(figure: Figure, moveDirection: MoveDirection): FigureMoveData {
        const movePatttern = figure.getMovePattern();

        let figureMoveData: FigureMoveData = {
            moveDirectionAllowed: false,
            madeMoveRange: 0
        };

        movePatttern.map(moveOption => {
            if (moveOption.direction == moveDirection) {
                figureMoveData.moveDirectionAllowed = true;
                figureMoveData.madeMoveRange = moveOption.range;
            }
        });
        
        return figureMoveData;
    }

    /**
     * Done move
     * @param currentCell 
     * @param newCell 
     * @param figureToMove 
     * @returns 
     */
    private acceptMove (currentCell: CellCoordinates, newCell:  CellCoordinates, figureToMove: Figure ): boolean {
        this.board.setFigurePosition(currentCell, newCell);
        figureToMove.moveDone();
        return true;
    }

    /**
     * Check if path for a move is clear
     * 
     * @param startCell 
     * @param targetCell 
     * @param direction 
     * @param madeMoveRange 
     * @returns 
     */
    private isMovePathClear(startCell: CellCoordinates, targetCell: CellCoordinates, direction: MoveDirection, madeMoveRange: number): boolean {
        const currentCell = JSON.parse(JSON.stringify(startCell));

        const moveLengthByRow = Math.abs(currentCell.row - targetCell.row);
        const moveLengthByColumn = Math.abs(currentCell.column - targetCell.column);

        const canMakeVerticalMove = madeMoveRange >= moveLengthByRow;
        const canMakeHorizontalMove = madeMoveRange >= moveLengthByColumn;
        
        const checkPath = this.pathClearChecker(startCell, targetCell, moveLengthByRow, moveLengthByColumn, canMakeVerticalMove, canMakeHorizontalMove);
        const pathClear = checkPath[direction]();

        return pathClear;
    }

    /**
     * Returns array of mapped functions to call correct path trace method.
     * 
     * Each element of MoveDirection enum is an index to function that calls path trace method for choosen direction
     * 
     * @param startCell cell from 
     * @param targetCell cell to
     * @param moveLengthByRow length of made move by rows
     * @param moveLengthByColumn length of made move by columns
     * @param canMakeVerticalMove figure allowed to move vertically 
     * @param canMakeHorizontalMove figure allowed to move horizontally 
     * @returns 
     */
    private pathClearChecker (startCell: CellCoordinates, targetCell: CellCoordinates, moveLengthByRow: number, moveLengthByColumn: number, canMakeVerticalMove: boolean, canMakeHorizontalMove: boolean): Function[] {
        let traceDirectionFunctions: Function[] = [];

        traceDirectionFunctions[MoveDirection.Forward as number] = (): boolean => canMakeVerticalMove ? this.pathTracer.isForwardMovePossible(startCell, targetCell, moveLengthByRow) : false;
        traceDirectionFunctions[MoveDirection.Back as number] = (): boolean => canMakeVerticalMove ? this.pathTracer.isBackMovePossible(startCell, targetCell, moveLengthByRow) : false;

        traceDirectionFunctions[MoveDirection.Right as number] = (): boolean => canMakeHorizontalMove ? this.pathTracer.isRightMovePossible(startCell, targetCell, moveLengthByColumn) : false;
        traceDirectionFunctions[MoveDirection.Left as number] = (): boolean => canMakeHorizontalMove ?this.pathTracer.isLeftMovePossible(startCell, targetCell, moveLengthByColumn) : false;

        traceDirectionFunctions[MoveDirection.DiagonalTopLeft as number] = (): boolean => canMakeHorizontalMove && canMakeVerticalMove ? this.pathTracer.isDiagonalTopLeftMovePossible(startCell, targetCell, moveLengthByColumn) : false;
        traceDirectionFunctions[MoveDirection.DiagonalBottomLeft as number] = (): boolean => canMakeHorizontalMove && canMakeVerticalMove ? this.pathTracer.isDiagonalBottomLeftMovePossible(startCell, targetCell, moveLengthByColumn) : false;
        traceDirectionFunctions[MoveDirection.DiagonalTopRight as number] = (): boolean => canMakeHorizontalMove && canMakeVerticalMove ? this.pathTracer.isDiagonalTopRightMovePossible(startCell, targetCell, moveLengthByColumn) : false;
        traceDirectionFunctions[MoveDirection.DiagonalBottomRight as number] = (): boolean => canMakeHorizontalMove && canMakeVerticalMove ? this.pathTracer.isDiagonalBottomRightMovePossible(startCell, targetCell, moveLengthByColumn) : false;

        return traceDirectionFunctions;
    }

    /**
     * Since pawn can capture only by diagonal there is special check
     * 
     * @param currentCell 
     * @param targetCell 
     * @param figureColor 
     * @returns 
     */
    private pawnCanCapture(currentCell: CellCoordinates, targetCell: CellCoordinates, figureColor: FigureColor): boolean {
        if (!(this.board.isCellCaptured(targetCell))) {
            return false;
        }

        let canCapture: boolean = false;

        const rowDirectionMath = figureColor == FigureColor.White ? targetCell.row == currentCell.row - 1 :targetCell.row == currentCell.row + 1;
        const columnMatch = currentCell.column + 1 == targetCell.column || currentCell.column - 1 == targetCell.column;

        if (rowDirectionMath && columnMatch) {
            canCapture = true;
        }

        return canCapture;
    }

    /**
     * Implementation of horses uncommon move pattern
     * @param currentCell 
     * @param targetCell 
     * @returns 
     */
    private horseCanMove(currentCell: CellCoordinates, targetCell: CellCoordinates): boolean {
        const rowDifference = Math.abs(currentCell.row - targetCell.row);
        const columnDifference = Math.abs(currentCell.column - targetCell.column);
        
        if((rowDifference == 1 && columnDifference == 2) || (rowDifference == 2 && columnDifference == 1)) {
            return true;
        }

        return false;
    }

    /**
     * Calculate direction of made move
     * @param targetCell 
     * @param figure 
     * @returns 
     */
    private determinateMoveDirection(targetCell: CellCoordinates, figure: Figure): MoveDirection {
        const rowDifference = targetCell.row - figure.position.row;
        const columnDifference = targetCell.column - figure.position.column;

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

        if (columnDifference < 0 && rowDifference < 0 && columnDifference == rowDifference) {
            return MoveDirection.DiagonalTopLeft;
        }

        if (columnDifference > 0 && rowDifference > 0 && columnDifference == rowDifference) {
            return MoveDirection.DiagonalBottomLeft;
        }

        if (columnDifference > 0 && rowDifference < 0 && columnDifference == -rowDifference) {
            return MoveDirection.DiagonalTopRight;
        }

        if (columnDifference < 0 && rowDifference > 0 && columnDifference == -rowDifference) {
            return MoveDirection.DiagonalBottomRight;
        }

    }
}