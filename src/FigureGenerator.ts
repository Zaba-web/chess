import Figure from "./Figures/Figure";
import { FigureColor } from "./Typedefs";
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
    public getPawnRow(colorOfSide: FigureColor, rowLength: number = 8): Figure[] {
        // select row position for pawns: 1 for black color and rowLength - 2 for white
        const rowPosition = colorOfSide == FigureColor.Black ? 1 : rowLength - 2; 

        let pawnRow: Figure [] = [];
        for(let i = 0; i < rowLength; i++) {
            let pawn = new Pawn(rowPosition, i, colorOfSide);
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
    public getMainFiguresRow(colorOfSide: FigureColor, rowLength: number = 8): Figure[] {
        const mainFigures = [Rook, Horse, Bishop, Queen, King, Bishop, Horse, Rook];
        
        // select row position for main figures: 0 for black color and rowLength - 1 for white
        const rowPosition = colorOfSide == FigureColor.Black ? 0 : rowLength - 1;

        let mainRow: Figure [] = [];
        for(let i = 0; i < rowLength; i++) {
            const figureConstructor = mainFigures[i];
            let figure = new figureConstructor(rowPosition, i, colorOfSide);

            mainRow.push(figure);
        }
        
        return mainRow;
    }
}