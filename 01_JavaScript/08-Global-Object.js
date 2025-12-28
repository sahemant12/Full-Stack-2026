
//1. "window object": It is global object in Js(can be accessed anywhere in our Js code). It is only available in browser Js engine. It allows us to interact with browser window.

// console.log(window);      // In browser
console.log(global);      // In Node.js(window object doesn't present in nodejs environment)
console.log(globalThis);  // Works in both



//1. "window object": It is global object in Js(can be accessed anywhere in our Js code). It is only available in browser Js engine. It allows us to interact with browser window.

// console.log(window);      // In browser
console.log(global);      // In Node.js(window object doesn't present in nodejs environment)
console.log(globalThis);  // Works in both


// Summary
// Global-Object
// Global Object is the top level object that stores global variables and APIs.
// In browser global-object is 'window', in node env global-object is 'global' and 'globalThis' is work both in browser and node as a global object.