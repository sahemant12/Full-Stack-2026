// 1. Prototypes is built-in mechanism in Js in which objects can inherit properties and methods from another objects through the prototype chain.

// 2. [[Prototype]] is an internal hidden property that every js object has, which points to its prototype object.

// 3. we can access this prototype linkage using '.prototype' on classes, methods and '__proto__' on objects

// VVI-1: .prototype is used on constructor functions and classes to define properties and methods that instances will inherit.

function Person() {}
Person.prototype.sayHi = function () {};

class User {}
User.prototype.greet = function () {};

// VVI-2: __proto__ is used on objects to access their internal [[Prototype]] (prototype chain link).

const u = {};
u.__proto__ === Object.prototype; // true

// 4. if ask internally, how it works then will show this e.g:

 const arr = [1, 2, 3];
// arr
//   |
//   └── [[Prototype]] ──► Array.prototype
//                           |
//                           └── [[Prototype]] ──► Object.prototype  ──► null


// NOTE-1: Object.prototype is the final fallback object for almost all objects in JavaScript.

// NOTE-2: Methods are placed on the prototype so that all instances can share them, which saves memory.