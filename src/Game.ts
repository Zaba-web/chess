import GraphicsRenderer from "./GraphicsRenderer"
import Board from "./Board";
import Figure from "./Figures/Figure";
import { FigureColor, CellCoordinates } from "./Typedefs";

import {Mesh} from "three";
import {Intersection} from "three";

/**
 * Main game class 
 * Initialization, user input
 * */
export default class Game {

    private graphicsRenderer: GraphicsRenderer;
    private board: Board;
    private boardMesh: Mesh;
    private selectedCell: CellCoordinates = {
        row: null, 
        column: null
    };
    private currentTurnBy: FigureColor;

    constructor () {
        this.graphicsRenderer = new GraphicsRenderer();
        this.currentTurnBy = FigureColor.White;
        this.board = new Board();
    }

    /**
     * Initializes processes that start a game
     */
    public initialize(): void {
        this.boardMesh = this.graphicsRenderer.createBoardMesh(this.board);
        this.graphicsRenderer.createFiguresMesh(this.board);
        this.setUpClickEventListener();

        // should be called after everything is setup
        this.graphicsRenderer.displayScene();
    }

    /**
     * Creates event listener that listen click on game board
     */
    public setUpClickEventListener(): void {
        this.graphicsRenderer.createClickOnObjectsHandler([this.boardMesh], (intersection) => {
            const [row, column] = this.determinateClickedCell(intersection);
            this.handleCellClick(row, column);
        });
    }

    private determinateClickedCell(clickOnMeshData: Intersection): number[] {
        let row = Math.abs(Math.round(clickOnMeshData.point.z + this.board.cellOffset));
        let column = Math.abs(Math.round(clickOnMeshData.point.x + this.board.cellOffset));

        return [row, column];
    }

    private handleCellClick(row: number, column: number): void {
        const clickedCell = this.board.getCellContainment(row, column);

        const clickedCellIsNotEmpty = clickedCell instanceof Figure;

        // if there is a figure on clicked cell we check if this figure belongs to current player
        const currentPlayersOwnsFigure = clickedCellIsNotEmpty ? this.currentTurnBy == clickedCell.color : false;

        if (this.noSelectedCell()) {
            if (clickedCellIsNotEmpty && currentPlayersOwnsFigure) {
                this.selectCell(row, column);
            }
        }  
        
        let moveMade: boolean;

        if (!this.noSelectedCell()) {
            if (currentPlayersOwnsFigure) {
                this.selectCell(row, column);
            } 
            
            if (!clickedCellIsNotEmpty || !currentPlayersOwnsFigure) {
                moveMade = this.board.tryToMakeMove(this.selectedCell.row, this.selectedCell.column, row, column)
            }
        }

        if (moveMade) {
            this.resetSelectedCell();
            this.changePlayer();
        }

        console.log(this.selectedCell);
    }

    private selectCell(row: number, column: number): void {
        this.selectedCell = {
            row: row,
            column: column
        };
    }

    private resetSelectedCell(): void {
        this.selectedCell = {
            row: null, 
            column: null
        };
    }

    private noSelectedCell(): boolean {
        return this.selectedCell.row == null && this.selectedCell.column == null;
    }

    private changePlayer(): void {
        this.currentTurnBy = this.currentTurnBy == FigureColor.White ? FigureColor.Black : FigureColor.White;
    }
}