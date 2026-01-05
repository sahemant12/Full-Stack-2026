//1. The join() method does not change the original array.
//2. The join() method returns a new string.
//3. The join() method is used to combine (join) all elements of an array into a single string, using a separator of your choice.
//4. Syntax: array.join(separator)
//5. join() with no argument → uses comma , by default.

// NOTE: joins convert array into string.
// Example-1: 
let fruits = ["apple", "banana", "cherry"];
let result = fruits.join();
console.log(result); // "apple,banana,cherry" // by default use comma , as seperator.

// Example-2: 
let words = ["Hello", "world"];
console.log(words.join(" ")); // "Hello world"

let parts = ["2025", "07", "19"];
console.log(parts.join("-")); // "2025-07-19"

let chars = ["H", "e", "l", "l", "o"];
console.log(chars.join("")); // "Hello"


let nums = [1, 2, 4, 5, 6];
console.log(typeof nums.join(), ": ", nums.join());
