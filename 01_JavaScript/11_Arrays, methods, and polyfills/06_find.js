//1. The find() method returns the value of the first element that passes a test.
//2. The find() method executes a function for each array element.
//3. The find() method returns undefined if no elements are found.
//4. The find() method does not execute the function for empty elements.
//5. The find() method does not change the original array.
//6. Syntax: array.find(function(currentValue, index, arr),thisValue)

// E.g-1
const numbers = [4, 9, 16, 25];
const result = numbers.find(num => num > 10);
console.log(result); // 16

// E.g-2
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: "Bob" }
