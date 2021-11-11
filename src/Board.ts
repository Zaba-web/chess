import { FigureGenerator } from "./FigureGenerator";
import Figure from "./Figures/Figure";

import {EmptyCell, Cell, FigureColor, MoveDirection, CellCoordinates} from "./Typedefs";

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

    public setFigurePosition(currentCell: CellCoordinates, newCell: CellCoordinates): boolean {
        if (this.getCellContainment(newCell) instanceof Figure) {
            const capturedFigure = this.getCellContainment(newCell) as Figure;
            capturedFigure.setPosition({row: -200, column: -200});
        }

        const figureToMove = this.state[currentCell.row][currentCell.column] as Figure;

        figureToMove.setPosition(newCell, this.cellOffset);

        this.state[currentCell.row][currentCell.column] = false;
        this.state[newCell.row][newCell.column] = figureToMove;

        console.table(this.state);

        return true;
    }

    private initializeDefaultBoardState(): void {
        const emptyCell: EmptyCell = false;

        const blackPawns = this.figureGenerator.getPawnRow(FigureColor.Black);
        const blackMainFigures = this.figureGenerator.getMainFiguresRow(FigureColor.Black);

        const whitePawns = this.figureGenerator.getPawnRow(FigureColor.White);
        const whiteMainFigures = this.figureGenerator.getMainFiguresRow(FigureColor.White);

        this._state = [
            blackMainFigures,
            blackPawns,
            [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
            [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
            [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
            [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
            whitePawns,
            whiteMainFigures
        ];

    }
}