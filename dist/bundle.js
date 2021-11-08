/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


/***/ }),

/***/ "./src/Board.ts":
/*!**********************!*\
  !*** ./src/Board.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Board)\n/* harmony export */ });\n/**\r\n * Represents chess board\r\n */\r\nclass Board {\r\n    constructor() {\r\n        this._rowsCount = 8;\r\n        this._columnsCount = 8;\r\n    }\r\n    get rowsCount() {\r\n        return this._rowsCount;\r\n    }\r\n    get columnsCount() {\r\n        return this._columnsCount;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://chess/./src/Board.ts?");

/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _GraphicsRenderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GraphicsRenderer */ \"./src/GraphicsRenderer.ts\");\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Board */ \"./src/Board.ts\");\n\r\n\r\n/**\r\n * Main game class\r\n * */\r\nclass Game {\r\n    constructor() {\r\n        this.graphicsRenderer = new _GraphicsRenderer__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this.borad = new _Board__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n    }\r\n    initialize() {\r\n        this.graphicsRenderer.displayScene();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://chess/./src/Game.ts?");

/***/ }),

/***/ "./src/GraphicsRenderer.ts":
/*!*********************************!*\
  !*** ./src/GraphicsRenderer.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GraphicsRenderer)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ \"./src/Board.ts\");\n\r\n\r\n/**\r\n * Class controlling graphics render process\r\n * */\r\nclass GraphicsRenderer {\r\n    constructor() {\r\n        /**\r\n         * Field of view in degrees\r\n         * */\r\n        this.FOV = 75;\r\n        this.aspectRatio = window.innerHeight / window.innerWidth;\r\n        this.nearPlane = 0.1;\r\n        this.farPlane = 1000;\r\n        this.sceneBackgroundColor = 0x525469;\r\n        this.scene = this.createNewScene();\r\n        this.camera = this.createNewCamera();\r\n        this.renderer = this.createNewRenderer();\r\n        this.board = new _Board__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    }\r\n    /**\r\n     * Display scene on the page\r\n     */\r\n    displayScene() {\r\n        this.applyRenderer(this.renderer, document.body);\r\n        this.renderBoard(this.board);\r\n        this.animate();\r\n    }\r\n    /**\r\n     * Display board on scene\r\n     * @param board Board type object\r\n     */\r\n    renderBoard(board) {\r\n    }\r\n    animate() {\r\n        requestAnimationFrame(() => { this.animate; });\r\n        this.renderer.render(this.scene, this.camera);\r\n    }\r\n    createNewScene() {\r\n        const scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();\r\n        scene.background = new three__WEBPACK_IMPORTED_MODULE_1__.Color(this.sceneBackgroundColor);\r\n        return scene;\r\n    }\r\n    createNewCamera() {\r\n        const camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(this.FOV, this.aspectRatio, this.nearPlane, this.farPlane);\r\n        camera.rotation.x = -0.4;\r\n        camera.position.set(0, 5, 5);\r\n        return camera;\r\n    }\r\n    createNewRenderer() {\r\n        const renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer();\r\n        renderer.setSize(window.innerWidth, window.innerHeight);\r\n        return renderer;\r\n    }\r\n    applyRenderer(renderer, container) {\r\n        container.appendChild(renderer.domElement);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://chess/./src/GraphicsRenderer.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n\r\nconst game = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\ngame.initialize();\r\n\n\n//# sourceURL=webpack://chess/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;