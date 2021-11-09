import Figure from "./Figure";
import { FiguresMeshURLs } from "../Typedefs";

/**
 * Bishop figure implementation
 */
export default class Bishop extends Figure {
    public canMoveToCell(row: number, column: number): boolean {
        return true;
    }

    public getFigureMeshURL(): FiguresMeshURLs {
        return FiguresMeshURLs.BishopMesh;
    }
}