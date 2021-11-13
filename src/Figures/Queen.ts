import Figure from "./Figure";
import { FigureMoveAbility, FiguresMeshURLs, MoveDirection } from "../Typedefs";

/**
 * Queen figure implementation
 */
export default class Queen extends Figure {
    public getFigureMeshURL(): FiguresMeshURLs {
        return FiguresMeshURLs.QueenMesh;
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
            },
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