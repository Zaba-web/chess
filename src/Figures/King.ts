import Figure from "./Figure";
import { FigureMoveAbility, FiguresMeshURLs, MoveDirection, } from "../Typedefs";

/**
 * Queen figure implementation
 */
export default class King extends Figure {
    public getFigureMeshURL(): FiguresMeshURLs {
        return FiguresMeshURLs.KingMesh;
    }

    public getMovePattern(): FigureMoveAbility[] {
        const movePattern: FigureMoveAbility[] = [
            {
                range: 1,
                direction: MoveDirection.Forward
            },
            {
                range: 1,
                direction: MoveDirection.Back
            },
            {
                range: 1,
                direction: MoveDirection.Right
            },
            {
                range: 1,
                direction: MoveDirection.Left
            },
            {
                range: 1,
                direction: MoveDirection.DiagonalTopLeft
            },
            {
                range: 1,
                direction: MoveDirection.DiagonalBottomLeft
            },
            {
                range: 1,
                direction: MoveDirection.DiagonalTopRight
            },
            {
                range: 1,
                direction: MoveDirection.DiagonalBottomRight
            }
        ]

        return movePattern;
    }

    public cellSuitableForMove(cellCaptured: boolean, cellUnderAttack: boolean): boolean {
        if (cellUnderAttack) {
            return false;
        }
        
        return true;
    }
}