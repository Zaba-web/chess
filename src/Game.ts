import GraphicsRenderer from "./GraphicsRenderer"
import Board from "./Board";
/**
 * Main game class 
 * */
export default class Game {

    private graphicsRenderer: GraphicsRenderer;
    private borad: Board;

    constructor () {
        this.graphicsRenderer = new GraphicsRenderer();
        this.borad = new Board();
    }

    public initialize(): void {
        this.graphicsRenderer.displayScene();
    }
}