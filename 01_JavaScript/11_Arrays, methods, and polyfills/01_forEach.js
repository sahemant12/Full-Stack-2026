//1. The forEach() method calls a callback function for each element in an array.
//2. The forEach() method is not executed for empty elements.
//3. No Return Value: It does not return a new array or any value; it returns undefined.

//syntax: array.forEach(callback(currentValue, index, array), thisArg);

const fruits = ['apple', 'banana', 'cherry'];
// fruits.forEach((currvalue, index, arr)=>{
//     console.log(`Element at index ${index}: ${currvalue}`);
// })

// Note:
// 1. thisArg sets the value of "this" inside the callback function.
// 2. splice, sort and fill mutate the original array.
// 3. map, forEach, filter, find have "thisArg".

// NOTE-2*****
// 'this' refers to the 'thisArg' passed as the second argument to map. It works only with normal functions, not arrow functions, because arrow functions do not have their own this.

// E.g:
const obj = {
  multiplier: 2
};

const result = [1,2,3].map(function (n) {
  return n * this.multiplier;
}, obj);

console.log(result); // [2,4,6]
