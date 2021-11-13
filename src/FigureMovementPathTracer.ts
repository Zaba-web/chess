import Board from "./Board";
import { CellCoordinates } from "./Typedefs";

enum Step {
        Forward = -1,
        Back = 1,
        Right = 1,
        Left = -1,
        LeftDiagonalTop = -1,
        LeftDiagonalBottom = 1
}

/**
 * Class that calculates if path of move is clear
 */
export default class FigureMovementPathTracer {
    private board: Board;

    constructor (board: Board) {
        this.board = board;
    }

    public isForwardMovePossible(startCell: CellCoordinates, targetCell: CellCoordinates, moveLength: number): boolean {
        return this.isVerticalClear(startCell, targetCell, moveLength, Step.Forward, this.biggerThanComparator);
    }

    public isBackMovePossible(startCell: CellCoordinates, targetCell: CellCoordinates, moveLength: number): boolean {
        return this.isVerticalClear(startCell, targetCell, moveLength, Step.Back, this.lessThanComparator);
    }

    public isRightMovePossible(startCell: CellCoordinates, targetCell: CellCoordinates, moveLength: number): boolean {
        return this.isHorizontalClear(startCell, targetCell, moveLength, Step.Right, this.lessThanComparator)
    }

    public isLeftMovePossible(startCell: CellCoordinates, targetCell: CellCoordinates, moveLength: number): boolean {
        return this.isHorizontalClear(startCell, targetCell, moveLength, Step.Left, this.biggerThanComparator)
    }

    public isDiagonalTopLeftMovePossible(startCell: CellCoordinates, targetCell: CellCoordinates, moveLength: number): boolean {
        return this.isDiagonalClear(startCell, targetCell, moveLength, Step.Left, Step.Forward, this.biggerThanComparator, this.biggerThanComparator);
    }

    public isDiagonalBottomLeftMovePossible(startCell: CellCoordinates, targetCell: CellCoordinates, moveLength: number): boolean {
        return this.isDiagonalClear(startCell, targetCell, moveLength, Step.Back, Step.Right, this.lessThanComparator, this.lessThanComparator);
    }

    public isDiagonalTopRightMovePossible(startCell: CellCoordinates, targetCell: CellCoordinates, moveLength: number): boolean {
        return this.isDiagonalClear(startCell, targetCell, moveLength, Step.Forward, Step.Right, this.biggerThanComparator, this.lessThanComparator);
    }
    
    public isDiagonalBottomRightMovePossible(startCell: CellCoordinates, targetCell: CellCoordinates, moveLength: number): boolean {
        return this.isDiagonalClear(startCell, targetCell, moveLength, Step.Back, Step.Left, this.lessThanComparator, this.biggerThanComparator);
    }

    /**
     * Helper method that compares two numbers
     * @param number1 supposed to be greater
     * @param number2 supposed to be lower
     * @returns 
     */
    private biggerThanComparator(number1: number, number2: number): boolean {
        return number1 > number2;
    }

    /**
     * Helper method that compares two numbers
     * @param number1 supposed to be lower
     * @param number2 supposed to be greater
     * @returns 
     */
    private lessThanComparator(number1: number, number2: number): boolean {
        return number1 < number2;
    }

    /**
     * Find obstacles on vertical line.
     * If there is a figures between start and target cells, path is considered not clear
     * @param startCell cell where from figure moves
     * @param targetCell cell where to figure moves
     * @param moveLength count of cells that it needs to make to reach target cell
     * @param step value by which current row increments at each iteration
     * @param compare function to compare current row with target row
     * @returns 
     */
    private isVerticalClear(startCell: CellCoordinates, targetCell: CellCoordinates, moveLength: number, step: number, compare: Function): boolean {
        let currentRow = startCell.row + step;
        const targetRow = startCell.row + moveLength * step;

        while (compare(currentRow, targetRow)) {
            let notLastCell = compare(currentRow, targetCell.row);

            if(notLastCell && this.board.isCellCaptured({row: currentRow, column: startCell.column})) {
                return false;
            }

            currentRow += step;
        }

        return true;
    }

    /**
     * Find obstacles on horizontal line.
     * If there is a figures between start and target cells, path is considered not clear
     * @param startCell cell where from figure moves
     * @param targetCell cell where to figure moves
     * @param moveLength count of cells that it needs to make to reach target cell
     * @param step value by which current column increments at each iteration
     * @param compare function to compare current column with target column
     * @returns 
     */

    private isHorizontalClear(startCell: CellCoordinates, targetCell: CellCoordinates, moveLength: number, step: number, compare: Function): boolean {
        let currentColumn = startCell.column + step;
        const targetColumn = startCell.column + moveLength * step;

        while (compare(currentColumn, targetColumn)) {
            let notLastCell = compare(currentColumn, targetCell.column);

            if(notLastCell && this.board.isCellCaptured({row: startCell.row, column: currentColumn})) {
                return false;
            }

            currentColumn += step;
        }

        return true;
    }

    /**
     * Find obstacles on diagonal lines.
     * If there is a figures between start and target cells, path is considered not clear
     * @param startCell cell where from figure moves
     * @param targetCell cell where to figure moves
     * @param moveLength count of cells that it needs to make to reach target cell
     * @param rowStep value by which current row increments at each iteration
     * @param columnStep value by which current column increments at each iteration
     * @param compareRows function to compare current row with target row
     * @param compareColumns function to compare current column with target column
     * @returns 
     */
    private isDiagonalClear(startCell: CellCoordinates, targetCell: CellCoordinates, moveLength: number, rowStep: number, columnStep: number, compareRows: Function, compareColumns: Function): boolean {
        let currentColumn = startCell.column + columnStep;
        let currentRow = startCell.row + rowStep;

        let targetRow = startCell.row + moveLength * rowStep;
        let targetColumn = startCell.column + moveLength * columnStep;

        while (compareRows(currentRow, targetRow) && compareColumns(currentColumn, targetColumn)) {
            let notLastCell = compareRows(currentRow, targetCell.row) && compareColumns(currentColumn, targetCell.column);
            
            if(notLastCell && this.board.isCellCaptured({row: currentRow, column: currentColumn})) {
                return false;
            }

            currentColumn += columnStep;
            currentRow += rowStep;
        }

        return true;
    }

}