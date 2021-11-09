import Pawn from "../src/Figures/Pawn";
import { FiguresMeshURLs, FigureColor } from "../src/Typedefs";

describe("Pawn figure should:", ()=>{
    const pawn = new Pawn(0, 0, FigureColor.Black);

    test("detect if move is possible or not", ()=>{
        expect(typeof pawn.canMoveToCell(2,2)).toEqual("boolean");
    });

    test("return URL to load 3d model", ()=>{
        expect(pawn.getFigureMeshURL()).toBeDefined();
    });
});
