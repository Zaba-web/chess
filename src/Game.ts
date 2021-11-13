import GraphicsRenderer from "./GraphicsRenderer"
import Board from "./Board";
import Figure from "./Figures/Figure";
import FigureMovementController from "./FigureMovementController";
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
    private currentTurnBy: FigureColor;
    private figureMovementController: FigureMovementController;
    private selectedCell: CellCoordinates = {
        row: null, 
        column: null
    };

    constructor () {
        this.graphicsRenderer = new GraphicsRenderer();
        this.currentTurnBy = FigureColor.White;
        this.board = new Board();
        this.figureMovementController = new FigureMovementController(this.board);
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
        this.graphicsRenderer.createClickOnObjectsHandler([this.boardMesh], (intersection: Intersection) => {
            const cell = this.determinateClickedCell(intersection);
            this.handleCellClick(cell);
        });
    }

    /**
     * Get coordinates of clicked cell in board format
     * @param clickOnMeshData object with information about clicked mesh
     * @returns 
     */
    private determinateClickedCell(clickOnMeshData: Intersection): CellCoordinates {
        let row = Math.abs(Math.round(clickOnMeshData.point.z + this.board.cellOffset));
        let column = Math.abs(Math.round(clickOnMeshData.point.x + this.board.cellOffset));

        return {
            row: row, 
            column: column
        };
    }

    private handleCellClick(cell: CellCoordinates): void {
        const clickedCell = this.board.getCellContainment(cell);

        const clickedCellIsNotEmpty = clickedCell instanceof Figure;

        // if there is a figure on clicked cell we check if this figure belongs to current player
        const currentPlayersOwnsFigure = clickedCellIsNotEmpty ? this.currentTurnBy == clickedCell.color : false;

        if (this.noSelectedCell()) {
            if (clickedCellIsNotEmpty && currentPlayersOwnsFigure) {
                this.selectCell(cell);
            }
        }  
        
        let moveMade: boolean;

        if (!this.noSelectedCell()) {
            if (currentPlayersOwnsFigure) {
                this.selectCell(cell);
            } 
            
            if (!clickedCellIsNotEmpty || !currentPlayersOwnsFigure) {
                moveMade = this.figureMovementController.makeMove(this.selectedCell, cell);
            }
        }

        if (moveMade) {
            this.resetSelectedCell();
            this.changePlayer();
        }
    }

    private selectCell(cell: CellCoordinates): void {
        this.selectedCell = {
            row: cell.row,
            column: cell.column
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