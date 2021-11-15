import Figure from "./Figures/Figure"

type EmptyCell = boolean;
type Cell = Figure | EmptyCell;

enum FiguresMeshURLs {
    PawnMesh = "./dist/assets/resources/models/pawn.obj",
    RookMesh = "./dist/assets/resources/models/rook.obj",
    HorseMesh = "./dist/assets/resources/models/horse.obj",
    BishopMesh = "./dist/assets/resources/models/bishop.obj",
    QueenMesh = "./dist/assets/resources/models/queen.obj",
    KingMesh = "./dist/assets/resources/models/king.obj"
}

enum FigureColor {
    Black = 0x4b5254,
    White = 0xFFFFFF
}

enum MoveDirection {
    Forward,
    Back,
    Left,
    Right,
    DiagonalTopLeft,
    DiagonalBottomLeft,
    DiagonalTopRight,
    DiagonalBottomRight
}

interface FigureMoveAbility {
    direction: MoveDirection, 
    range: number
}

interface CellCoordinates {
    row: number,
    column: number
}

interface FigureMoveData {
    moveDirectionAllowed: boolean, 
    madeMoveRange: number
}

export {EmptyCell, Cell, FiguresMeshURLs, FigureColor, CellCoordinates, MoveDirection, FigureMoveAbility, FigureMoveData}