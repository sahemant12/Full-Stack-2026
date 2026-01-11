// Currying: Currying is a technique where a function with multiple arguments is transformed into a sequence of functions, each taking one argument at a time.

// Normal function (before currying):
function add(a, b, c) {
  return a + b + c;
}
console.log(add(1, 2, 3)); // 6

// Curried version of the same function: 
function add(a) { // each fn take one argument and return another function
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

let sum = add(1);
let sum2 = sum(5);
let sum3 = sum2(6);
console.log(sum3);

let totalSum = add(1)(5)(6);
console.log(totalSum);

// Why this works (VERY IMPORTANT)?
// Ans: Because of closures. b remembers a, c remembers a and b


// Cleaner version using arrow functions:
const add = a => b => c => a + b + c; // arrowtotalSum
let arrowtotalSum = add(1)(5)(6);
console.log(arrowtotalSum);

// Real-world example (VERY PRACTICAL):
// Without currying:
function discount(price, rate) {
  return price - price * rate;
}

// With currying
const discount = rate => price => price - price * rate;

const tenPercentOff = discount(0.1);
const twentyPercentOff = discount(0.2);

tenPercentOff(100);    // 90
twentyPercentOff(100); // 80



// When should you use currying?
// Ans: 
// Discount calculation, like fix the price and just pass discount to get actual price.