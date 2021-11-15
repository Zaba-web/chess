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
    private Kings: Figure[] = [];
    private rotateCamera: boolean;
    private currentPlayerUIText: HTMLDivElement;
    private cameraRotationChangeButton: HTMLInputElement;

    constructor () {
        this.graphicsRenderer = new GraphicsRenderer();
        this.currentTurnBy = FigureColor.White;
        this.board = new Board();
        this.figureMovementController = new FigureMovementController(this.board);
        this.rotateCamera = false;

        this.currentPlayerUIText = document.querySelector(".current-player-color");
        this.cameraRotationChangeButton = document.querySelector(".camera-rotate-change-button");
    }

    /**
     * Initializes processes that start a game
     */
    public initialize(): void {
        this.boardMesh = this.graphicsRenderer.createBoardMesh(this.board);
        this.graphicsRenderer.createFiguresMesh(this.board);
        this.setUpClickEventListener();

        this.Kings[FigureColor.White] = this.board.getCellContainment({row: 7,column: 4}) as Figure;
        this.Kings[FigureColor.Black] = this.board.getCellContainment({row: 0,column: 4}) as Figure;

        this.displayCurrentPlayer();

        this.cameraRotationChangeButton.addEventListener("click", ()=>{
            this.changeCameraRotationMode();
        });

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

    private changeCameraRotationMode(): void {
        this.rotateCamera = !this.rotateCamera;
        this.cameraRotationChangeButton.value = this.rotateCamera ? "Enabled" : "Disabled";
    }

    private displayCurrentPlayer() {
        const currentPlayerName = this.currentTurnBy == FigureColor.White ? "White" : "Black";
        this.currentPlayerUIText.innerText = currentPlayerName;
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
            this.moveDone();
        }
    }

    private moveDone() {
        this.resetSelectedCell();
        this.changePlayer();
        this.displayCurrentPlayer();

        if(!this.isCheckTheKing(FigureColor.White) && !this.isCheckTheKing(FigureColor.Black)) {
            this.graphicsRenderer.hideCheckMark();
        }
        
        if (this.rotateCamera) {
            this.graphicsRenderer.changeCameraSide();
        }
    }
    
    private isCheckTheKing(kingColor: FigureColor): boolean {
        if(this.board.isCellUnderAttack(this.Kings[kingColor].position, kingColor)) {
            this.showCheckMark(this.Kings[kingColor]);
            return true;
        }
    }

    private showCheckMark(king: Figure) {
        this.graphicsRenderer.showCheckMark(king.position.column - this.board.cellOffset, king.position.row - this.board.cellOffset)
    }

    private selectCell(cell: CellCoordinates): void {
        this.selectedCell = {
            row: cell.row,
            column: cell.column
        };

        this.graphicsRenderer.selectFigure(this.selectedCell.column - this.board.cellOffset, this.selectedCell.row - this.board.cellOffset);
    }

    private resetSelectedCell(): void {
        this.selectedCell = {
            row: null, 
            column: null
        };

        this.graphicsRenderer.unselectFigure();
    }

    private noSelectedCell(): boolean {
        return this.selectedCell.row == null && this.selectedCell.column == null;
    }

    private changePlayer(): void {
        this.currentTurnBy = this.currentTurnBy == FigureColor.White ? FigureColor.Black : FigureColor.White;
    }
}