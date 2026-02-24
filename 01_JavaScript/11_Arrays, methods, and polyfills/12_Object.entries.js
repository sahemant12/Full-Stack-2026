
// Object.entries() is a JavaScript method that converts an object into an array of key-value pairs.

// E.g-1:
const user = {
  name: "Hemant",
  age: 23,
  role: "developer"
};

const result = Object.entries(user);
console.log(result);
// OUTPUT:
// [
//   ["name", "Hemant"],
//   ["age", 23],
//   ["role", "developer"]
// ]

// Why it is useful?
// 1. Looping through objects easily.
const user2 = { name: "Hemant", age: 23 };

for (const [key, value] of Object.entries(user2)) {
  console.log(key, value);
}
// OUTPUT:
// name Hemant
// age 23

// 2. Transforming objects
const scores = { math: 80, english: 70 };

const updated = Object.entries(scores).map(([key, value]) => {
  return [key, value + 5];
});

console.log(Object.fromEntries(updated));
// OUTPUT:
// { math: 85, english: 75 }


// Quick comparison (very important)
// Object.keys(obj) → returns only keys
// Object.values(obj) → returns only values
// Object.entries(obj) → returns both key & value (as pairs)