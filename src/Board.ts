import { FigureGenerator } from "./FigureGenerator";
import Figure from "./Figures/Figure";

import {Cell, CellCoordinates} from "./Typedefs";

/**
 * Represents chess board
 */
export default class Board {
    private readonly _rowsCount: number = 8;
    private readonly _columnsCount: number = 8;
    private figureGenerator: FigureGenerator;
    private  _state: Cell[][];

    public readonly cellOffset: number;

    constructor () {
        this.cellOffset = 3.5;
        this.figureGenerator = new FigureGenerator();
        this.initializeDefaultBoardState();
    }

    public get rowsCount(): number {
        return this._rowsCount;
    }

    public get columnsCount(): number {
        return this._columnsCount;
    }

    public get state(): Cell[][] {
        return this._state;
    }

    /**
     * Get value of board cell
     */
    public getCellContainment(cell: CellCoordinates): Cell {
        return this.state[cell.row][cell.column];
    }

    /**
     * Check if there is a figure on cell
     * @param cell Cell to check
     * @returns 
     */
    public isCellCaptured(cell: CellCoordinates): boolean {
        if(this.getCellContainment(cell) instanceof Figure) {
            return true;
        }
        
        return false;
    }

    /**
     * Check if there are enemy figures that can reach this cell
     * @param cell cell to check
     * @returns 
     */
    public isCellUnderAttack(cell: CellCoordinates): boolean {
        return false;
    }

    /**
     * Change figure poisition on the board
     * @param currentCell cell where needed figure is
     * @param newCell cell where it needs to be placed
     * @returns 
     */
    public setFigurePosition(currentCell: CellCoordinates, newCell: CellCoordinates): boolean {
        if (this.getCellContainment(newCell) instanceof Figure) {
            const capturedFigure = this.getCellContainment(newCell) as Figure;
            capturedFigure.setPosition({row: -200, column: -200});
        }

        const figureToMove = this.state[currentCell.row][currentCell.column] as Figure;

        figureToMove.setPosition(newCell, this.cellOffset);

        this.state[currentCell.row][currentCell.column] = false;
        this.state[newCell.row][newCell.column] = figureToMove;

        return true;
    }

    private initializeDefaultBoardState(): void {
        this._state = this.figureGenerator.generateDefaultBoardConfig();
    }
}