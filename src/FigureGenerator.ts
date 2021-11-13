import Figure from "./Figures/Figure";
import { Cell, EmptyCell, FigureColor } from "./Typedefs";
import Pawn from "./Figures/Pawn";
import Rook from "./Figures/Rook";
import Horse from "./Figures/Horse";
import Bishop from "./Figures/Bishop";
import Queen from "./Figures/Queen";
import King from "./Figures/King";

/**
 * Class that generates default set of figures.
 */
export class FigureGenerator {
    /**
     * Generates array of pawns when game starts
     * @param colorOfSide 
     * @param rowLength 8 by default
     * @returns Array of Figure
     */
     private getPawnRow(colorOfSide: FigureColor, rowLength: number = 8): Figure[] {
        // select row position for pawns: 1 for black color and rowLength - 2 for white
        const rowPosition = colorOfSide == FigureColor.Black ? 1 : rowLength - 2; 

        let pawnRow: Figure [] = [];
        for(let i = 0; i < rowLength; i++) {
            const cell = {row: rowPosition, column: i};
            let pawn = new Pawn(cell, colorOfSide);
            pawnRow.push(pawn);
        }

        return pawnRow;
    }

    /**
     * Generates array of main figures when game starts
     * @param colorOfSide 
     * @param rowLength 8 by default
     * @returns Array of Figure
     */
     private getMainFiguresRow(colorOfSide: FigureColor, rowLength: number = 8): Figure[] {
        const mainFigures = [Rook, Horse, Bishop, Queen, King, Bishop, Horse, Rook];
        
        // select row position for main figures: 0 for black color and rowLength - 1 for white
        const rowPosition = colorOfSide == FigureColor.Black ? 0 : rowLength - 1;

        let mainRow: Figure [] = [];
        for(let i = 0; i < rowLength; i++) {
            const figureConstructor = mainFigures[i];
            const cell = {row: rowPosition, column: i};
            let figure = new figureConstructor(cell, colorOfSide);

            mainRow.push(figure);
        }
        
        return mainRow;
    }

    /**
     * Generates line of empty cells
     * @param count length of line
     * @returns 
     */
    private getEmptyLine(count: number = 8): Cell[] {
        let emptyCells: Cell[] = [];
        const emptyCell: EmptyCell = false;

        for(let i = 0; i < count; i++) {
            emptyCells.push(emptyCell);
        }

        return emptyCells;
    }

    /**
     * Generates default set of figures for start
     * @returns 
     */
    public generateDefaultBoardConfig(): Cell[][] {

        const blackPawns = this.getPawnRow(FigureColor.Black);
        const blackMainFigures = this.getMainFiguresRow(FigureColor.Black);

        const whitePawns = this.getPawnRow(FigureColor.White);
        const whiteMainFigures = this.getMainFiguresRow(FigureColor.White);

        const state = [
            blackMainFigures,
            blackPawns,
            this.getEmptyLine(),
            this.getEmptyLine(),
            this.getEmptyLine(),
            this.getEmptyLine(),
            whitePawns,
            whiteMainFigures
        ];

        return state;
    }
}