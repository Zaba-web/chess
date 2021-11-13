import Figure from "./Figure";
import { FigureMoveAbility, FiguresMeshURLs, MoveDirection } from "../Typedefs";

/**
 * Rook figure implementation
 */
export default class Rook extends Figure {
    public getFigureMeshURL(): FiguresMeshURLs {
        return FiguresMeshURLs.RookMesh;
    }

    public getMovePattern(): FigureMoveAbility[] {
        const movePattern: FigureMoveAbility[] = [
            {
                range: 8,
                direction: MoveDirection.Forward
            },
            {
                range: 8,
                direction: MoveDirection.Back
            },
            {
                range: 8,
                direction: MoveDirection.Right
            },
            {
                range: 8,
                direction: MoveDirection.Left
            }
        ]

        return movePattern;
    }

    public cellSuitableForMove(cellCaptured: boolean, cellUnderAttack: boolean): boolean {
        return true;
    }
}