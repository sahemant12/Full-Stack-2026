//1. The splice() method adds and/or removes array elements.
//2. The splice() method overwrites the original array.
//3. Return type: An array containing the removed items (if any).
//4. Negative index works (starts from the end).
//5. syntax: array.splice(index, deleteCount, item1, item2, ..., itemN).

// //Remove elements:
// let fruits = ['apple', 'banana', 'mango', 'orange'];
// let removed = fruits.splice(1, 2); // remove 2 items from index 1
// console.log(fruits);  // ['apple', 'orange']
// console.log(removed); // ['banana', 'mango']

// //Add elements:
// let fruits2 = ['apple', 'orange'];
// fruits.splice(1, 0, 'banana', 'mango'); // insert at index 1, delete 0 items
// console.log(fruits); // ['apple', 'banana', 'mango', 'orange']


// //Replace elements:
// let fruits3 = ['apple', 'banana', 'mango'];
// fruits.splice(1, 1, 'orange'); // remove 1 from index 1, insert 'orange'
// console.log(fruits); // ['apple', 'orange', 'mango']

// //Replace elements from last:
// let fruits4 = ['apple', 'banana', 'mango'];
// fruits4.splice(-1, 1, 'orange'); // replaces last element
// console.log(fruits); // ['apple', 'banana', 'orange']


// // Create a custom remove-by-value function
// // JavaScript arrays don’t have a direct remove(value) method, but you can use splice():
// let arr = ['apple', 'banana', 'mango'];
// let index = arr.indexOf('banana');
// if(index !== -1) {
//   arr.splice(index, 1);
// }
// console.log(arr);  // ['apple', 'mango']
