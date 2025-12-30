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




// 3. why arrow fn don't have this?
// Ans: I think this is how arrow fn designed to inherit 'this' from their lexical scope.

const obj = {
    a:10,
    fn1: function(){
        console.log(`I'm: ${this.a}, of fn1`); // I'm: 10, of fn1     
    },
    upperFn: function(){
        let fn3 = () => {
            console.log(`I'm: ${this.a}, of fn3`); // I'm: 10, of fn3
        }
        fn3();
    },

    fn2: () => {
        console.log(`I'm: ${this.a}, of fn2`); // I'm: undefined, of fn2
    }
}
obj.fn1();
obj.fn2(); // fn2() don't have their own 'this' so it looks in his lexical scope i.e global scope. In non-strict mode('this' in global scope refers to 'window object' and window.a = undefined).
obj.upperFn(); // fn3() don't have their own 'this' so it looks in his lexical scope i.e upperFn(). For upperFn() 'this' refer to 'obj' so fn3() get this.a from 'obj'


// NOTE-1: fn3() should declared with let/const becoz it give scope(upperfn()) to fn3() otherwise it become GLOBAL variable(in non-strict mode).
// Objects do NOT create scope. Functions and blocks(let/const) create scope. So fn3() declared with let.

// Note: arrow fn do not have their own 'this'. They inherit it from their lexical scope.



// Solve this and give output
const obj2 = {
    x:1122,
    y: function(){
        z = () => {
            console.log(this); // arrow fn refer to its lexical environment.   
        }
        z();
    }
}
obj2.y();