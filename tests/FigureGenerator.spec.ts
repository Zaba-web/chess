import { FigureGenerator } from "../src/FigureGenerator";
import { FigureColor } from "../src/Typedefs";

import Bishop from "../src/Figures/Bishop";
import Figure from "../src/Figures/Figure";
import Horse from "../src/Figures/Horse";
import King from "../src/Figures/King";
import Rook from "../src/Figures/Rook";
import Pawn from "../src/Figures/Pawn";

describe("Figure generator class should: ", () => {
    const figureGenerator = new FigureGenerator();

    test("generate a default set of figures", ()=>{
        const emptyLines = figureGenerator.generateDefaultBoardConfig();

        expect(emptyLines[0][0]).toBeInstanceOf(Rook);
        expect(emptyLines[1][0]).toBeInstanceOf(Pawn);
        expect(emptyLines[2][0]).toBeFalsy();
        expect(emptyLines[5][0]).toBeFalsy();
        expect(emptyLines[6][0]).toBeInstanceOf(Pawn);
        expect(emptyLines[7][0]).toBeInstanceOf(Rook);

        expect(emptyLines[0][4]).toBeInstanceOf(King);
        expect(emptyLines[7][4]).toBeInstanceOf(King);
    });
});