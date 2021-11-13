import Figure from "./Figure";
import { FigureColor, FiguresMeshURLs, FigureMoveAbility, MoveDirection} from "../Typedefs";

/**
 * Pawn figure implementation
 */
export default class Pawn extends Figure {
    public getFigureMeshURL(): FiguresMeshURLs {
        return FiguresMeshURLs.PawnMesh;
    }

    public getMovePattern(): FigureMoveAbility[] {
        let movePattern: FigureMoveAbility = {
            range: this.firstMoveDone ? 1 : 2,
            direction: this.color == FigureColor.White ? MoveDirection.Forward : MoveDirection.Back
        }

        return [movePattern];
    }

    public cellSuitableForMove(cellCaptured: boolean, cellUnderAttack: boolean): boolean {
        if(cellCaptured) {
            return false;
        }

        return true;
    }
}