import { FiguresMeshURLs, FigureColor, CellCoordinates, MoveDirection, FigureMoveAbility } from "../Typedefs";
import { Object3D } from "three";
/**
 * Abstract class that describes chess figures
 */
export default abstract class Figure {
    private rowPosition: number;
    private columnPosition: number;
    private _color: FigureColor;
    private objectModel: Object3D;
    public firstMoveDone: boolean;

    /**
     * 
     * @param startCell Start position on startup
     * @param color Figure color
     */
    constructor (startCell: CellCoordinates, color: FigureColor) {
        this.setPosition(startCell);
        this._color = color;
        this.firstMoveDone = false;
    }

    /**
     * Change position of figure.  
     * @param cell
     * @param offset // difference between 0 0 coordinates on scene and 0 0 cell on board
     */
    public setPosition(cell: CellCoordinates, offset?: number): void {
        this.rowPosition = cell.row;
        this.columnPosition = cell.column;

        this.updateModelPosition(offset);
    }

    public get position(): CellCoordinates {
        return {
            row: this.rowPosition,
            column: this.columnPosition
        }
    }

    public get color (): FigureColor {
        return this._color;
    }

    public setObjectModel (model: Object3D): void {
        this.objectModel = model;
    }

    public getObjectModel(): Object3D {
        return this.objectModel;
    }

    public moveDone (): void {
        this.firstMoveDone = true;
    }

    public abstract getFigureMeshURL(): FiguresMeshURLs;

    public abstract getMovePattern(): FigureMoveAbility[];

    public abstract cellSuitableForMove(cellCaptured: boolean, cellUnderAttack: boolean): boolean;

    private updateModelPosition(offset: number): void {
        if(this.objectModel) { 
            this.objectModel.position.set(this.columnPosition - offset, 0.5, this.rowPosition - offset);
        }
    }
}