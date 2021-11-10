import { FigureGenerator } from "./FigureGenerator";
import Figure from "./Figures/Figure";
import Pawn from "./Figures/Pawn";

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
    public getCellContainment(row: number, column: number): Cell {
        return this.state[row][column];
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