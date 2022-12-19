/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
var __webpack_exports__ = {};
/*!********************************************!*\
  !*** ./src/scripts/contentscript/index.ts ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/**
 * your code here
 */

var script = document.createElement('script');
script.src = chrome.runtime.getURL('/js/injectscript.js');
script.onload = function () {
  script.remove();
};
document.body.style.backgroundColor = '';
(document.head || document.documentElement || document.body).appendChild(script);
 // stops ts error that the file isn't a module
/******/ })()
;
//# sourceMappingURL=contentscript.js.map