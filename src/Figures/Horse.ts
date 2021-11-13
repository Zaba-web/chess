import Figure from "./Figure";
import { FigureMoveAbility, FiguresMeshURLs } from "../Typedefs";

/**
 * Horse figure implementation
 */
export default class Horse extends Figure {
    public getLinearMovementPattern(): boolean {
        return false;
    }

    public getFigureMeshURL(): FiguresMeshURLs {
        return FiguresMeshURLs.HorseMesh;
    }

    public getMovePattern(): FigureMoveAbility[] {
        return [];
    }

    public cellSuitableForMove(cellCaptured: boolean, cellUnderAttack: boolean): boolean {
        return true;
    }
}