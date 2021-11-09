import Figure from "./Figure";
import { FiguresMeshURLs } from "../Typedefs";

/**
 * Rook figure implementation
 */
export default class Rook extends Figure {
    public canMoveToCell(row: number, column: number): boolean {
        return true;
    }

    public getFigureMeshURL(): FiguresMeshURLs {
        return FiguresMeshURLs.RookMesh;
    }
}