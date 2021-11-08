import * as THREE from "three";
import Board from "./Board";
/**
 * Class controlling graphics render process  
 * */
export default class GraphicsRenderer {

    private scene: THREE.Scene;
    private camera: THREE.Camera;
    
    /**
     * Field of view in degrees 
     * */
    private readonly FOV: number = 75;
    private readonly aspectRatio: number = window.innerHeight / window.innerWidth;
    private readonly nearPlane: number = 0.1;
    private readonly farPlane: number = 1000;
    private readonly sceneBackgroundColor: number = 0x525469;
    private readonly board: Board;

    private renderer: THREE.Renderer;

    constructor() {
        this.scene = this.createNewScene();
        this.camera = this.createNewCamera();
        this.renderer = this.createNewRenderer();
        this.board = new Board();
    }

    /**
     * Display scene on the page
     */
    public displayScene(): void {
        this.applyRenderer(this.renderer, document.body);
        this.renderBoard(this.board);
        this.animate();
    }
    
    /**
     * Display board on scene
     * @param board Board type object
     */
    public renderBoard(board: Board): void {

    }

    private animate(): void {
        requestAnimationFrame(()=>{this.animate});

        this.renderer.render(this.scene, this.camera);
    }

    private createNewScene(): THREE.Scene {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(this.sceneBackgroundColor);

        return scene;
    }

    private createNewCamera(): THREE.Camera {
        const camera = new THREE.PerspectiveCamera(
            this.FOV, 
            this.aspectRatio, 
            this.nearPlane, 
            this.farPlane);

        camera.rotation.x = -0.4;
        camera.position.set(0, 5, 5);
        return camera;
    }

    private createNewRenderer(): THREE.Renderer {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        return renderer;
    }

    private applyRenderer(renderer: THREE.Renderer, container: HTMLElement): void {
        container.appendChild(renderer.domElement);
    }
}