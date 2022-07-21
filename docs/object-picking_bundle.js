/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/object-picking.ts":
/*!*******************************!*\
  !*** ./src/object-picking.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright (C) 2019-2021 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PickingExample = void 0;
const harp_map_controls_1 = __webpack_require__(/*! @here/harp-map-controls */ "../harp-map-controls/index.ts");
const harp_mapview_1 = __webpack_require__(/*! @here/harp-mapview */ "../harp-mapview/index.ts");
const harp_vectortile_datasource_1 = __webpack_require__(/*! @here/harp-vectortile-datasource */ "../harp-vectortile-datasource/index.ts");
const config_1 = __webpack_require__(/*! ../config */ "./config.ts");
/**
 * This example showcases how picking works.
 *
 * To enable polygon picking set `gatherFeatureAttributes: true` in
 * [[OmvWithRestClientParams]] or in [[OmvWithCustomDataProvider]].
 * To enable text element picking set `gatherFeatureAttributes: true` in
 * [[OmvWithRestClientParams]] or in [[OmvWithCustomDataProvider]].
 *
 * Now, let's write an event that fires when the user clicks the map canvas:
 * ```typescript
 * [[include:datasource_object_picking_1.ts]]
 * ```
 *
 * All the data handling is covered by the `handlePick` function. Here we find the
 * intersected objects, pick the first one in the array and display its
 * data inside the helper box
 * ```typescript
 * [[include:datasource_object_picking_2.ts]]
 * ```
 */
var PickingExample;
(function (PickingExample) {
    document.body.innerHTML += `
        <style>
            #mouse-picked-result{
                position:absolute;
                bottom:5px;
                border-radius: 5px;
                margin-left:10px;
                padding: 9px 12px;
                background: #37afaa;
                display: inline-block;
                visibility: hidden;
                text-align: left;
                right:50px;
            }
            #mapCanvas {
              top: 0;
            }
            #info{
                color: #fff;
                width: 80%;
                left: 50%;
                position: relative;
                margin: 10px 0 0 -40%;
                font-size: 15px;
            }
            @media screen and (max-width: 700px) {
                #info{
                    font-size:11px;
                }
            }
        </style>
        <p id=info>Click/touch a feature on the map to read its data (Land masses are not features).
        </p>
        <pre id="mouse-picked-result"></pre>
    `;
    initializeMapView("mapCanvas").catch(err => {
        throw err;
    });
    let lastCanvasPosition;
    function getCanvasPosition(event, canvas) {
        const { left, top } = canvas.getBoundingClientRect();
        return { x: event.clientX - Math.floor(left), y: event.clientY - Math.floor(top) };
    }
    // Trigger picking event only if there's (almost) no dragging.
    function isPick(eventPosition) {
        const MAX_MOVE = 5;
        return (lastCanvasPosition &&
            Math.abs(lastCanvasPosition.x - eventPosition.x) <= MAX_MOVE &&
            Math.abs(lastCanvasPosition.y - eventPosition.y) <= MAX_MOVE);
    }
    // snippet:datasource_object_picking_2.ts
    const element = document.getElementById("mouse-picked-result");
    let current;
    function handlePick(mapViewUsed, x, y) {
        // get an array of intersection results from MapView
        var _a;
        let usableIntersections = mapViewUsed
            .intersectMapObjects(x, y)
            .filter(item => item.userData !== undefined);
        if (usableIntersections.length > 1) {
            usableIntersections = usableIntersections.filter(item => item !== current);
        }
        if (usableIntersections.length === 0) {
            // Hide helper box
            element.style.visibility = "hidden";
            return;
        }
        // Get userData from the first result;
        current = usableIntersections[0];
        if (((_a = current.userData) === null || _a === void 0 ? void 0 : _a.name) !== undefined) {
            mapViewUsed.setDynamicProperty("selection", [current.userData.name]);
        }
        // Show helper box
        element.style.visibility = "visible";
        // Display userData inside of helper box
        element.innerText = JSON.stringify(current.userData, undefined, 2);
    }
    // end:datasource_object_picking_2.ts
    /**
     * Creates a new MapView for the HTMLCanvasElement of the given id.
     */
    async function initializeMapView(id) {
        const canvas = document.getElementById(id);
        const selectionTheme = {
            styles: {
                tilezen: [
                    {
                        transient: true,
                        layer: "roads",
                        when: ["==", ["geometry-type"], "LineString"],
                        technique: "solid-line",
                        renderOrder: Number.MAX_SAFE_INTEGER,
                        enabled: [
                            "in",
                            ["get", "name"],
                            ["get", "selection", ["dynamic-properties"]]
                        ],
                        lineWidth: "2px"
                    },
                    {
                        transient: true,
                        layer: "landuse",
                        when: ["==", ["geometry-type"], "Polygon"],
                        technique: "solid-line",
                        renderOrder: Number.MAX_SAFE_INTEGER,
                        enabled: [
                            "in",
                            ["get", "name"],
                            ["get", "selection", ["dynamic-properties"]]
                        ],
                        lineWidth: "2px"
                    }
                ]
            }
        };
        const mapView = new harp_mapview_1.MapView({
            canvas,
            theme: {
                extends: [selectionTheme, "resources/berlin_tilezen_base.json"]
            },
            enableRoadPicking: true,
            target: [-74.01, 40.707],
            zoomLevel: 18
        });
        harp_mapview_1.CopyrightElementHandler.install("copyrightNotice", mapView);
        const controls = new harp_map_controls_1.MapControls(mapView);
        // Add an UI.
        const ui = new harp_map_controls_1.MapControlsUI(controls, { zoomLevel: "input" });
        canvas.parentElement.appendChild(ui.domElement);
        window.addEventListener("resize", () => {
            mapView.resize(window.innerWidth, window.innerHeight);
        });
        // snippet:datasource_object_picking_1.ts
        canvas.addEventListener("mousedown", event => {
            lastCanvasPosition = getCanvasPosition(event, canvas);
        });
        canvas.addEventListener("touchstart", event => {
            if (event.touches.length !== 1) {
                return;
            }
            lastCanvasPosition = getCanvasPosition(event.touches[0], canvas);
        });
        canvas.addEventListener("mouseup", event => {
            const canvasPos = getCanvasPosition(event, canvas);
            if (isPick(canvasPos)) {
                handlePick(mapView, canvasPos.x, canvasPos.y);
            }
        });
        canvas.addEventListener("touchend", event => {
            if (event.changedTouches.length !== 1) {
                return;
            }
            const canvasPos = getCanvasPosition(event.changedTouches[0], canvas);
            if (isPick(canvasPos)) {
                handlePick(mapView, canvasPos.x, canvasPos.y);
            }
        });
        // end:datasource_object_picking_1.ts
        const omvDataSource = new harp_vectortile_datasource_1.VectorTileDataSource({
            baseUrl: "https://vector.hereapi.com/v2/vectortiles/base/mc",
            authenticationCode: config_1.apikey,
            gatherFeatureAttributes: true
        });
        mapView.setDynamicProperty("selection", []);
        await mapView.addDataSource(omvDataSource);
        mapView.update();
    }
})(PickingExample = exports.PickingExample || (exports.PickingExample = {}));


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
/******/ 			"object-picking": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/object-picking.ts","common"]
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
//# sourceMappingURL=object-picking_bundle.js.map