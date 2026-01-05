//1. The fill() method fills specified elements in an array with a value.
//2. The fill() method overwrites the original array.
//3. Syntax: array.fill(value, start, end)
//4. Return type: return the original modified array.

// NOTE: splice, sort and fill mutates the original array.

// Example-1: Fill entire array
let arr = [1, 2, 3, 4];
arr.fill(0);
console.log(arr); // [0, 0, 0, 0]

// Example-2: Fill from a specific index
let arr2 = [1, 2, 3, 4, 5];
arr.fill(9, 2);
console.log(arr2); // [1, 2, 9, 9, 9]

// Example-3: Fill between specific indexes
let arr3 = [1, 2, 3, 4, 5];
arr.fill("X", 1, 4);
console.log(arr3); // [1, "X", "X", "X", 5]

// Example-4: It modifies the original array
let a = [1, 2, 3];
let b = a.fill(0);
console.log(a); // [0, 0, 0]
console.log(b); // [0, 0, 0] (same array)

// Example-5: helps to Create a dummy array
let arr4 = new Array(5).fill(0);
console.log(arr4); // [0, 0, 0, 0, 0]

// Example-6: helps in Reset data
let scores = [56, 77, 89, 90];
scores.fill(0);
console.log(scores); // [0, 0, 0, 0]