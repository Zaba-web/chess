import { FiguresMeshURLs, FigureColor, CellCoordinates } from "../Typedefs";
import { Object3D } from "three";
/**
 * Abstract class that describes chess figures
 */
export default abstract class Figure {
    private rowPosition: number;
    private columnPosition: number;
    private _color: FigureColor;
    private objectModel: Object3D;

    /**
     * 
     * @param startRowPosition Row position on startup
     * @param startColumnPosition Column position on startup
     */
    constructor (startRowPosition: number, startColumnPosition: number, color: FigureColor) {
        this.setPosition(startRowPosition, startColumnPosition);
        this._color = color;
    }

    /**
     * Change position of figure. 
     * @param rowPosition
     * @param columnPosition 
     */
    public setPosition(rowPosition: number, columnPosition: number, offset?: number): void {
        this.rowPosition = rowPosition;
        this.columnPosition = columnPosition;

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

    public abstract canMoveToCell(row: number, column: number): boolean;

    public abstract getFigureMeshURL(): FiguresMeshURLs;

    private updateModelPosition(offset: number): void {
        if(this.objectModel) {
            this.objectModel.position.set(
                this.columnPosition - offset, 
                0.5, 
                this.rowPosition - offset);
        }
    }
}