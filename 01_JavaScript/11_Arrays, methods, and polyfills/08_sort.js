//1. The sort() method sorts the elements of an array.
//2. The sort() method sorts the elements as strings in alphabetical and ascending order.
//3. The sort() method overwrites the original array.
//4. Return Value: The array with the items sorted.
//5. By default, it sorts elements as strings, in lexicographical (dictionary) order, even if the array contains numbers!
//6. syntax: array.sort(compareFunction)

// Example-1: Sort Strings Alphabetically
let names = ['banana', 'apple', 'cherry'];
names.sort();
console.log(names); // ['apple', 'banana', 'cherry']

// Example-2: Case-Sensitive Sort
let words = ['Zebra', 'apple', 'Banana'];
words.sort();
console.log(words); // ['Banana', 'Zebra', 'apple'] // Uppercase comes before lowercase in Unicode.

let items = ['Zebra', 'apple', 'Banana'];
items.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(items); // ['apple', 'Banana', 'Zebra']


// Example-3: Correct way to sort numbers
let arr = [100, 9, 10, 20];
arr.sort();
console.log(arr); // [10, 100, 20, 9] → Sorted as strings! // wrong way

let numbers = [100, 9, 10, 20];
numbers.sort((a, b) => a - b); // ascending order sorting.
console.log(numbers); // [9, 10, 20, 100]

let numbers2 = [5, 2, 10, 1];
numbers.sort((a, b) => b - a); // decending order sorting.
console.log(numbers2); // [10, 5, 2, 1]


// Example-4: Sort Objects by property
let users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
];

// Sort by age ascending
users.sort((a, b) => a.age - b.age);
console.log(users);
/*
[
  { name: 'Bob', age: 25 },
  { name: 'Alice', age: 30 },
  { name: 'Charlie', age: 35 }
]
*/


// Example-5: Sort modifies the original array
let arr2 = [3, 1, 2];
let sorted = arr2.sort();
console.log(arr2);   // [1, 2, 3] → original changed!
console.log(sorted); // [1, 2, 3]

// if you want to keep the original, clone it first
let arr3 = [3, 1, 2];
let clone = [...arr3].sort((a, b) => a - b);

console.log(arr3);   // [3, 1, 2] → original not changed!
console.log(clone); // [1, 2, 3]
