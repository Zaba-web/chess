import { FigureGenerator } from "./FigureGenerator";
import Figure from "./Figures/Figure";

import {EmptyCell, Cell, FigureColor} from "./Typedefs";

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
    public getCellContainment(row: number, column: number): Cell {
        return this.state[row][column];
    }

    /**
     * Initializes process of making a move
     * @param currentRow row that selected figure stands on
     * @param currentColumn column that selected figure stands on
     * @param newRow target row
     * @param newColumn target column
     */
    public tryToMakeMove(currentRow: number, currentColumn: number, newRow: number, newColumn: number): boolean {
        if(!(this._state[currentRow][currentColumn] instanceof Figure)) {
            return ;
        }

        const figureToMove = this._state[currentRow][currentColumn] as Figure;

        const figureCanMakeSuchMove = figureToMove.canMoveToCell(newRow, newColumn);

        if (!figureCanMakeSuchMove) {
            return false;
        }

        figureToMove.setPosition(newRow, newColumn, this.cellOffset);

        this._state[currentRow][currentColumn] = false;
        this._state[newRow][newColumn] = figureToMove;

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