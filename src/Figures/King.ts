import Figure from "./Figure";
import { FiguresMeshURLs } from "../Typedefs";

/**
 * Queen figure implementation
 */
export default class King extends Figure {
    public canMoveToCell(row: number, column: number): boolean {
        return true;
    }

    public getFigureMeshURL(): FiguresMeshURLs {
        return FiguresMeshURLs.KingMesh;
    }
}