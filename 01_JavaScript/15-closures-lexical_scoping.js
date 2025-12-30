// 1. lexical scoping: Lexical scoping means a function can access variables from the scope where it is defined, not where it is called.

// E.g:
let x = 100;

function foo() {
  console.log(x);
}

function bar() {
  let x = 50;
  foo();
}

bar(); // 100

// Even foo() is called inside bar() but still foo() use global x.
// Why? becoz foo() is defined in global scope.
// This is lexical scoping


// 2. closures: closure is a fn that has access to the variables of its outer fn, even after the outer fn finish its execution.
// why? we return a fn that still hold its reference.
// Drawback of closure: memory leak.

function increment(){
    let count = 0; // hiding variables

    // Closure Function: fn binded by its lexical scope.
    return function(){
        return ++count;
    }
}
const incr = increment();
console.log(incr()); // 1
console.log(incr()); // 2
console.log(incr()); // 3


// Step-by-step
// 1. increment() is run
// 2. count created
// 3. a function return
// 4. increment() finishes execution
// 5. but, count is not destroyed becoz return fn still needs it.


// Some ques related with closures:
// 1. Closures cause memory leak?
// Ans: yes, if closures keep unused references.

// 2. How to avoid memory leaks?
// Ans: by cleanup fn, removing unused references.

// 3. Why are closures useful?
// Ans: closures are useful in 'data privacy', 'maintaining state' etc.
// data privacy: hiding variables and expose only controlled access.
// maintaining state: remembering values between function calls(E.g: 1, 2, 3 output in above code)