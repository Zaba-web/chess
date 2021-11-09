import Figure from "./Figure";
import { FiguresMeshURLs } from "../Typedefs";

/**
 * Pawn figure implementation
 */
export default class Pawn extends Figure {
    public canMoveToCell(row: number, column: number): boolean {
        return true;
    }

    public getFigureMeshURL(): FiguresMeshURLs {
        return FiguresMeshURLs.PawnMesh;
    }
}