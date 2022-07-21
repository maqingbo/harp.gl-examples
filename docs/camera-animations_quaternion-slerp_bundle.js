/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/camera-animations_quaternion-slerp.ts":
/*!***************************************************!*\
  !*** ./src/camera-animations_quaternion-slerp.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright (C) 2019-2021 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThreejsCameraAnimation = void 0;
const harp_geoutils_1 = __webpack_require__(/*! @here/harp-geoutils */ "../harp-geoutils/index.ts");
const harp_mapview_1 = __webpack_require__(/*! @here/harp-mapview */ "../harp-mapview/index.ts");
const THREE = __webpack_require__(/*! three */ "three");
const getting_started_hello_world_npm_1 = __webpack_require__(/*! ./getting-started_hello-world_npm */ "./src/getting-started_hello-world_npm.ts");
/**
 * This example builds on top of the [[HelloWorldExample]], so please consult that first for
 * any questions regarding basic setup of the map.
 *
 * This example shows how to use [[MapViewUtils]] to compute camera positions and orientations
 * and use them to animate them with [THREE.js](https://threejs.org/).
 *
 * [CatmulRomCurve3](https://threejs.org/docs/index.html#api/en/extras/curves/CatmullRomCurve3) is
 * used to interpolate between two camera positions and
 * [Quaternion](https://threejs.org/docs/index.html#api/en/math/Quaternion.slerp) is used to
 * interpolate between two camera orientations.
 */
var ThreejsCameraAnimation;
(function (ThreejsCameraAnimation) {
    let currentLocation = 0;
    const locations = [
        {
            // HERE Berlin
            target: new harp_geoutils_1.GeoCoordinates(52.5308419, 13.3850719),
            tilt: 0,
            heading: 0,
            distance: 1000
        },
        {
            // Museumsinsel Berlin
            target: new harp_geoutils_1.GeoCoordinates(52.5169285, 13.4010829),
            tilt: 45,
            heading: 45,
            distance: 300
        },
        {
            // TV-Tower Berlin
            target: new harp_geoutils_1.GeoCoordinates(52.520836, 13.409401, 300),
            tilt: 45,
            heading: 180,
            distance: 500
        }
    ];
    const message = document.createElement("div");
    const threejsLink = "https://threejs.org";
    message.innerHTML = `Example showing camera animations using
<a href="${threejsLink}">three.js</a>
<br>
Tap or use left/right keys to change location`;
    message.style.cssText = `
    color: #000;
    width: 80%;
    left: 50%;
    position: relative;
    margin-left: -40%;
    font-size: 15px;
    `;
    document.body.appendChild(message);
    function startTransition(mapView, location) {
        const startPosition = mapView.camera.position.clone();
        const startQuaternion = mapView.camera.quaternion.clone();
        const targetPosition = harp_mapview_1.MapViewUtils.getCameraPositionFromTargetCoordinates(location.target, location.distance, location.heading, location.tilt, mapView.projection);
        const targetQuaternion = harp_mapview_1.MapViewUtils.getCameraRotationAtTarget(mapView.projection, location.target, location.heading, location.tilt);
        const startTime = Date.now();
        const curve = new THREE.CatmullRomCurve3([startPosition, targetPosition]);
        const updateListener = () => {
            const time = Date.now();
            let t = (time - startTime) / 1000;
            if (t >= 1) {
                t = 1;
                mapView.endAnimation();
                mapView.removeEventListener(harp_mapview_1.MapViewEventNames.Render, updateListener);
            }
            mapView.camera.position.copy(curve.getPoint(t));
            const rotation = startQuaternion.clone().slerp(targetQuaternion, t);
            mapView.camera.quaternion.copy(rotation);
            mapView.camera.updateMatrixWorld(true);
        };
        mapView.addEventListener(harp_mapview_1.MapViewEventNames.Render, updateListener);
        mapView.beginAnimation();
    }
    startTransition(getting_started_hello_world_npm_1.HelloWorldExample.mapView, locations[0]);
    window.ontouchend = (ev) => {
        const oldLocation = locations[currentLocation];
        currentLocation++;
        if (currentLocation >= locations.length) {
            currentLocation = 0;
        }
        const newLocation = locations[currentLocation];
        if (oldLocation === newLocation) {
            return;
        }
        startTransition(getting_started_hello_world_npm_1.HelloWorldExample.mapView, newLocation);
    };
    window.onkeydown = (ev) => {
        const oldLocation = locations[currentLocation];
        switch (ev.code) {
            case "ArrowLeft":
                currentLocation--;
                break;
            case "ArrowRight":
                currentLocation++;
                break;
        }
        if (currentLocation < 0) {
            currentLocation = locations.length - 1;
        }
        else if (currentLocation >= locations.length) {
            currentLocation = 0;
        }
        const newLocation = locations[currentLocation];
        if (oldLocation === newLocation) {
            return;
        }
        startTransition(getting_started_hello_world_npm_1.HelloWorldExample.mapView, newLocation);
    };
})(ThreejsCameraAnimation = exports.ThreejsCameraAnimation || (exports.ThreejsCameraAnimation = {}));


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
/******/ 			"camera-animations_quaternion-slerp": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/camera-animations_quaternion-slerp.ts","common"]
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
//# sourceMappingURL=camera-animations_quaternion-slerp_bundle.js.map