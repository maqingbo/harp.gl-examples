/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/threejs_animation.ts":
/*!**********************************!*\
  !*** ./src/threejs_animation.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright (C) 2019-2021 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThreejsAddAnimatedObject = void 0;
const harp_geoutils_1 = __webpack_require__(/*! @here/harp-geoutils */ "../harp-geoutils/index.ts");
const harp_mapview_1 = __webpack_require__(/*! @here/harp-mapview */ "../harp-mapview/index.ts");
const THREE = __webpack_require__(/*! three */ "three");
const FBXLoader_js_1 = __webpack_require__(/*! three/examples/jsm/loaders/FBXLoader.js */ "../../node_modules/three/examples/jsm/loaders/FBXLoader.js");
const getting_started_hello_world_npm_1 = __webpack_require__(/*! ./getting-started_hello-world_npm */ "./src/getting-started_hello-world_npm.ts");
/**
 * This example builds on top of the [[ThreejsAddSimpleObject]].
 * Additionaly this example shows how to animate a [THREE.js](https://threejs.org/) object that
 * was added to the scene.
 *
 * Therefore the object is loaded with one of the [THREE.js](https://threejs.org/) loaders (we chose
 * FBX here).
 * ```typescript
 * [[include:harp_gl_threejs_add_animated-object_load.ts]]
 * ```
 *
 * Once the object is loaded, we add it to the [[MapView.scene]] :
 * ```typescript
 * [[include:harp_gl_threejs_add_animated-object_add_to_scene.ts]]
 * ```
 *
 * Similar to the [[ThreejsAddSimpleObject]] example we add an event listener to the map view
 * that is called whenever the map is rendered to update the position of the object.
 * ```typescript
 * [[include:harp_gl_threejs_add_animated-object_add_listener.ts]]
 * ```
 * In the same callback we additionaly update the animation of our object:
 * ```typescript
 * [[include:harp_gl_threejs_add_animated-object_update_animation.ts]]
 * ```
 *
 * Normaly the map is only rendered when needed, i.e. when the user is interacting with the map.
 * Since we want to have a constant animation we have to tell [[MapView]] to always render.
 * We can do this via [[MapView.beginAnimation]]. We can stop the animation again with
 * [[MapView.endAnimation]].
 * ```typescript
 * [[include:harp_gl_threejs_add_animated-object_begin_animation.ts]]
 * ```
 */
var ThreejsAddAnimatedObject;
(function (ThreejsAddAnimatedObject) {
    const mapView = getting_started_hello_world_npm_1.HelloWorldExample.mapView;
    const figureGeoPosition = new harp_geoutils_1.GeoCoordinates(40.70497091, -74.0135);
    mapView.lookAt({ target: figureGeoPosition, zoomLevel: 20, tilt: 40, heading: 40 });
    const clock = new THREE.Clock();
    let figure;
    let mixer;
    const onLoad = (object) => {
        mixer = new THREE.AnimationMixer(object);
        const action = mixer.clipAction(object.animations[0]);
        action.play();
        figure = object;
        figure.traverse((child) => {
            child.renderOrder = 10000;
        });
        figure.renderOrder = 10000;
        figure.rotateX(Math.PI / 2);
        figure.scale.set(0.3, 0.3, 0.3);
        figure.name = "guy";
        // snippet:harp_gl_threejs_add_animated-object_add_to_scene.ts
        figure.anchor = figureGeoPosition;
        // Make sure the object is rendered on top of labels
        figure.overlay = true;
        mapView.mapAnchors.add(figure);
        // end:harp_gl_threejs_add_animated-object_add_to_scene.ts
    };
    // snippet:harp_gl_threejs_add_animated-object_load.ts
    const loader = new FBXLoader_js_1.FBXLoader();
    loader.load("resources/dancing.fbx", onLoad);
    // end:harp_gl_threejs_add_animated-object_load.ts
    const onRender = (event) => {
        if (mixer) {
            // snippet:harp_gl_threejs_add_animated-object_update_animation.ts
            const delta = clock.getDelta();
            mixer.update(delta);
            // end:harp_gl_threejs_add_animated-object_update_animation.ts
        }
    };
    // snippet:harp_gl_threejs_add_animated-object_add_listener.ts
    mapView.addEventListener(harp_mapview_1.MapViewEventNames.Render, onRender);
    // end:harp_gl_threejs_add_animated-object_add_listener.ts
    // snippet:harp_gl_threejs_add_animated-object_begin_animation.ts
    mapView.beginAnimation();
    // end:harp_gl_threejs_add_animated-object_begin_animation.ts
})(ThreejsAddAnimatedObject = exports.ThreejsAddAnimatedObject || (exports.ThreejsAddAnimatedObject = {}));


/***/ }),

/***/ "three":
/*!************************!*\
  !*** external "THREE" ***!
  \************************/
/***/ ((module) => {

module.exports = THREE;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {}
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"threejs_animation": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/threejs_animation.ts","common"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_here_harp_examples"] = self["webpackChunk_here_harp_examples"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;
//# sourceMappingURL=threejs_animation_bundle.js.map