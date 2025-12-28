// Var, Let and Const: used to declared variables.

// 3 Main difference.

// 1. Scope
// var is fn scoped or global scoped means we can access it within fn or script. Whereas let and const are block-scoped means we cannot access outside of its scope.

// 2. redeclared and reassigned
// var can be redeclared and reassigned, let can be reassigned but cannot be redeclared in the same scope whereas const cannot redeclared and reassigned.

//3. Hoisting
// var is hoisted and initailize with undefined so we can access it before initialization whereas let and const are also hoisted but not initailize so we cannot access it before initialization. They remain in TDZ until they are declared.

console.log(text1); // undefined
console.log(text2); // ReferenceError: Cannot access 'text2' before initialization
console.log(text3); // ReferenceError: Cannot access 'text3' before initialization

var text1 = "hello";
let text2 = "Namaste";
const text3 = "Bonjour";

// This is very important, understand it fully.

// 1. Js runs in 2 phase

// 2. Phase-1: Creation Phase(Memory Allocation)

// in memory:
// text1 = undefined
// text2 = uninitialized (TDZ)
// text3 = uninitialized (TDZ)

// 3. Phase-2: Execution Phase(line by line)
// undefined
// ReferenceError: Cannot access 'text2' before initialization
// ReferenceError: Cannot access 'text2' before initialization


// NOTE: For fn

// 1. Fn declaration: entire fn body store into memory. So can be call before its definition.

// 2. Fn Expression and Arrow Fn: since its variable are store into memory and is remain uninitialized(TDZ) so it cannot be call before initialization.
