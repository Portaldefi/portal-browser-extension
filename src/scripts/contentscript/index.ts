/**
 * your code here
 */

var script = document.createElement('script');
script.src = chrome.runtime.getURL('/js/injectscript.js');
script.onload = function() {
  script.remove();
}
document.body.style.backgroundColor = '';
(document.head || document.documentElement || document.body).appendChild(script);

export {}; // stops ts error that the file isn't a module
