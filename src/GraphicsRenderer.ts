import * as THREE from "three";
import Board from "./Board";
import Figure from "./Figures/Figure";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import Horse from "./Figures/Horse";
import { FigureColor } from "./Typedefs";

/**
 * Class controlling graphics render process  
 * */
export default class GraphicsRenderer {

    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private textureLoader: THREE.TextureLoader;
    private cameraControls: OrbitControls;
    private objectLoader: OBJLoader;
    private figureSelector: THREE.Object3D;
    private checkMark: THREE.Object3D;
    
    /**
     * Field of view in degrees 
     * */
    private readonly FOV: number = 75;
    private readonly aspectRatio: number = window.innerWidth / window.innerHeight;
    private readonly nearPlane: number = 0.1;
    private readonly farPlane: number = 1000;
    private readonly sceneBackgroundColor: number = 0x525469;

    private renderer: THREE.Renderer;

    constructor() {
        this.scene = this.createNewScene();
        this.camera = this.createNewCamera();
        this.renderer = this.createNewRenderer();
        this.textureLoader = this.createNewTextureLoader();
        this.objectLoader = this.createNewObjectLoader();
        this.figureSelector = this.createFigureSelector();
        this.checkMark = this.createKingCheckMark();

        this.scene.add(this.figureSelector);
        this.scene.add(this.createNewLightSource());
        this.scene.add(this.checkMark);

        // Orbit controls plugin. Adds camera movement by mouse
        this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    /**
     * Display scene on the page
     */
    public displayScene(): void {
        this.applyRenderer(this.renderer, document.body);
        this.animate();
    }

    /**
     * Display board on scene
     * @param board Board type object
     */
    public createBoardMesh(board: Board): THREE.Mesh {
        const boardTextureBaseColor = this.textureLoader.load(`./dist/assets/resources/textures/boardTexture.png`);
        boardTextureBaseColor.wrapS = THREE.RepeatWrapping;
        boardTextureBaseColor.wrapT = THREE.RepeatWrapping;
        boardTextureBaseColor.repeat.set(
            board.rowsCount / 2, 
            board.columnsCount / 2);
        
        const boardGeometry = new THREE.BoxGeometry(board.rowsCount, 1, board.columnsCount);
        const boardMaterial = new THREE.MeshStandardMaterial({
            map: boardTextureBaseColor,
            metalness: 0.6,
            roughness: 0.5
        });

        const boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);
        boardMesh.position.set(0, 0, 0);

        this.scene.add(boardMesh);

        return boardMesh;
    }

    /**
     * Creates event listeners on objects click
     * @param objects 
     * @param callback 
     */
    public createClickOnObjectsHandler(objects: THREE.Object3D[], callback: Function): void {
        let mouse = new THREE.Vector2();
        let raycaster = new THREE.Raycaster();
        
        document.addEventListener("click", (event) => {
            mouse.x = (event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
            mouse.y = - (event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;

            raycaster.setFromCamera(mouse, this.camera);

            let intersections = raycaster.intersectObjects(objects);

            intersections.map(item => {
                callback(item);
            });
        });
    }

    /**
     * Renders figures a on board at startup
     * @param board Board object
     */
    public createFiguresMesh (board: Board): void {
        const boardState = board.state;

        for(let row in boardState) {
            for (let col in boardState) {
                if(boardState[row][col] instanceof Figure) {
                    const figure = boardState[row][col] as Figure;
                    this.createConreteFigure(figure, board.cellOffset, figure.color);
                }
            }
        }
    }

    public changeCameraSide(): void {
        this.camera.position.set(this.camera.position.x, this.camera.position.y, -this.camera.position.z);
    }

    private createConreteFigure (figure: Figure, offset: number, color: number): void {
        this.objectLoader.load(figure.getFigureMeshURL(), (object)=>{
            const figurePosition = figure.position;
            
            object.scale.set(0.5, 0.5, 0.5);

            object.position.set(
                figurePosition.column - offset,
                0.5,
                figurePosition.row - offset
            );
            
            const material = new THREE.MeshStandardMaterial({
                color: color,
                metalness: 0.9,
                roughness: 0.8
            });

            object.traverse((node: THREE.Mesh)=>{
                if(node.isMesh) {
                    node.material = material;
                }
            })

            // Since horse is not symmetrical it needs to be flipped for one of sides
            if ( (figure instanceof Horse) && color == FigureColor.Black) {
                const rotatinonMirrorValue = 3.2;
                object.rotation.y = rotatinonMirrorValue;
            }

            figure.setObjectModel(object);
            this.scene.add(figure.getObjectModel());
        });
    }

    private createSelectorTypeMesh(color: number): THREE.Object3D {
        const geomtery = new THREE.BoxGeometry(1, 2, 1);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            opacity: .3,
            transparent: true
        });

        return new THREE.Mesh(geomtery, material);
    }

    private createFigureSelector(): THREE.Object3D {
        const figureSelectorMesh = this.createSelectorTypeMesh(0xFFFFFF);
        figureSelectorMesh.position.set(-200, 1, 0);

        return figureSelectorMesh;
    }

    private createKingCheckMark(): THREE.Object3D {
        const figureSelectorMesh = this.createSelectorTypeMesh(0xeda411);
        figureSelectorMesh.position.set(-200, 1, 0);

        return figureSelectorMesh;
    }

    /**
     * Show selected figure
     * @param x coordinate x
     * @param z coordinate z
     */
    public selectFigure (x: number, z: number): void {
        this.figureSelector.position.set(x, 1, z);
    }
    
    /**
     * Remove selection
     */
    public unselectFigure(): void {
        this.figureSelector.position.set(-200, 1, 0);
    }

    /**
     * Display check warning
     * @param x coordinate x
     * @param z coordinate z
     */
    public showCheckMark(x: number, z: number): void {
        this.checkMark.position.set(x, 1, z);
    }

    /**
     * Hide check warning
     */
    public hideCheckMark(): void {
        this.checkMark.position.set(-200, 1, 0);
    }

    private animate(): void {
        requestAnimationFrame(()=>{this.animate()});

        this.cameraControls.update();

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

        camera.position.set(0, 5, 6);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        return camera;
    }

    private createNewRenderer(): THREE.Renderer {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        return renderer;
    }

    private createNewLightSource(): THREE.DirectionalLight {
        const lightSource = new THREE.DirectionalLight(0xFFFFFF, 2);
        lightSource.position.set(8, 32, 9);
        lightSource.lookAt(new THREE.Vector3(0, 0, 0));

        return lightSource;
    }

    private applyRenderer(renderer: THREE.Renderer, container: HTMLElement): void {
        container.appendChild(renderer.domElement);
    }

    private createNewTextureLoader(): THREE.TextureLoader {
        const textureLoader = new THREE.TextureLoader();
        return textureLoader;
    }

    private createNewObjectLoader(): OBJLoader {
        return new OBJLoader();
    }
}