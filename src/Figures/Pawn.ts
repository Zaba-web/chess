import Figure from "./Figure";
import { FigureColor, FiguresMeshURLs, FigureMoveAbility, MoveDirection} from "../Typedefs";

/**
 * Pawn figure implementation
 */
export default class Pawn extends Figure {
    private moveRange: number = 2;

    public getFigureMeshURL(): FiguresMeshURLs {
        return FiguresMeshURLs.PawnMesh;
    }

    public getMovePattern(): FigureMoveAbility[] {
        let movePattern: FigureMoveAbility = {
            range: this.moveRange,
            direction: MoveDirection.Forward
        }

        if (this.color == FigureColor.Black) {
            movePattern.direction = MoveDirection.Back;
        }

        return [movePattern];
    }

    public moveDone() {
        this.moveRange = 1;
    }
}