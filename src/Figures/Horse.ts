import Figure from "./Figure";
import { FiguresMeshURLs } from "../Typedefs";

/**
 * Horse figure implementation
 */
export default class Horse extends Figure {
    public canMoveToCell(row: number, column: number): boolean {
        return true;
    }

    public getFigureMeshURL(): FiguresMeshURLs {
        return FiguresMeshURLs.HorseMesh;
    }
}