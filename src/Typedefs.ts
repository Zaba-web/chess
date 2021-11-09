import Figure from "./Figures/Figure"

type EmptyCell = boolean;
type Cell = Figure | EmptyCell;

enum FiguresMeshURLs {
    PawnMesh = "./assets/resources/models/pawn.obj",
    RookMesh = "./assets/resources/models/rook.obj",
    HorseMesh = "./assets/resources/models/horse.obj",
    BishopMesh = "./assets/resources/models/bishop.obj",
    QueenMesh = "./assets/resources/models/queen.obj",
    KingMesh = "./assets/resources/models/king.obj"
}

enum FigureColor {
    Black = 0x4b5254,
    White = 0xFFFFFF
}

interface CellCoordinates {
    row: number,
    column: number
}

export {EmptyCell, Cell, FiguresMeshURLs, FigureColor, CellCoordinates}