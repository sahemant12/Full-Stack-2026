// Let's understand by the help of example:

let fname = "Hemant";

function sayName(){
    let lname = "Sah";
    console.log(fname, lname);   
}
console.log(fname);
sayName();


// 1. First, the Global Execution Context (GEC) is created.
//    It has two phases: Memory Creation Phase and Execution Phase.

// 2. Memory Creation Phase (GEC):
//    fname is declared but remains uninitialized (TDZ).
//    sayName is stored with its complete function body.
//    this is set to the global object (browser, non-strict).

// 3. Execution Phase (GEC):
//    fname is initialized with "Hemant".
//    console.log(fname) prints "Hemant".
//    sayName() is called.

// 4. When sayName() is called, a Function Execution Context (FEC) is created, which also has a Memory Phase and an Execution Phase.

// 5. Memory Creation Phase (FEC):
//    lname is declared but uninitialized (TDZ).

// 6. Execution Phase (FEC):
//   lname is initialized with "Sah".
//   console.log(fname, lname) runs.

// 7. fname is not found in local scope, so JavaScript looks up the scope chain and finds it in the global scope.


// Simplest**:
// 1. In Memory Creation Phase, memory is allocated for variables and functions.
// 2. In Execution Phase, code executes line by line.

// What is GEC?
// Ans: GEC allocates the memory for variables and functions and executes the code line by line.