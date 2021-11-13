import Figure from "./Figure";
import { FigureMoveAbility, FiguresMeshURLs, MoveDirection } from "../Typedefs";

/**
 * Bishop figure implementation
 */
export default class Bishop extends Figure {
    public getFigureMeshURL(): FiguresMeshURLs {
        return FiguresMeshURLs.BishopMesh;
    }

    public getMovePattern(): FigureMoveAbility[] {
        let movePattern: FigureMoveAbility[] = [
            {
                range: 8,
                direction: MoveDirection.DiagonalTopLeft
            },
            {
                range: 8,
                direction: MoveDirection.DiagonalBottomLeft
            },
            {
                range: 8,
                direction: MoveDirection.DiagonalTopRight
            },
            {
                range: 8,
                direction: MoveDirection.DiagonalBottomRight
            }
        ]

        return movePattern;
    }

    public cellSuitableForMove(cellCaptured: boolean, cellUnderAttack: boolean): boolean {
        return true;
    }
}