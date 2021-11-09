import { FigureGenerator } from "../src/FigureGenerator";
import { FigureColor } from "../src/Typedefs";

import Bishop from "../src/Figures/Bishop";
import Figure from "../src/Figures/Figure";
import Horse from "../src/Figures/Horse";
import King from "../src/Figures/King";
import Queen from "../src/Figures/Queen";
import Rook from "../src/Figures/Rook";

describe("Figure generator class should: ", () => {
    const figureGenerator = new FigureGenerator();

    test("generate a pawn row", ()=>{
        const figures = figureGenerator.getPawnRow(FigureColor.Black);

        expect(figures[0]).toBeInstanceOf(Figure);
        expect(figures[7]).toBeInstanceOf(Figure);

        expect(figures[0].color).toEqual(FigureColor.Black);
    });

    test("generate a row of main figures", ()=>{
        const figures = figureGenerator.getMainFiguresRow(FigureColor.Black);

        expect(figures[0]).toBeInstanceOf(Rook);
        expect(figures[1]).toBeInstanceOf(Horse);
        expect(figures[2]).toBeInstanceOf(Bishop);
        expect(figures[3]).toBeInstanceOf(Queen);
        expect(figures[4]).toBeInstanceOf(King);

        expect(figures[0].color).toEqual(FigureColor.Black);
    });
});