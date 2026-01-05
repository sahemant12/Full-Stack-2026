// 1. call, apply, and bind are about controlling this.
// 2. WHY do we need call, apply, bind?
// Ans: Normally, JS decides 'this' automatically(where should it point to). With call / apply / bind, YOU decide where 'this' point to. Basically using call/apply/bind, we can control 'this'.

// Let's understand by an example:

function greet(city, country) {
  console.log(`Hi, I am ${this.name} from ${city}, ${country}`);
}
const user1 = { name: "Hemant" };
const user2 = { name: "Rahul" };

// #1. Call: Calls a function immediately and sets the value of 'this' explicitly. Also,arguments passed individually. 

// Syntax: fn.call(thisArg, arg1, arg2, ...)
greet.call(user1, "Delhi", "India"); // Hi, I am Hemant from Delhi, India

// above 'this' become 'user1' and 'user2'
// Function is executed immediately


// #2. Apply: Calls a function immediately and sets the value of 'this' explicitly but arguments passed as an array.

// Syntax: fn.apply(thisArg, [arg1, arg2, ...])
greet.apply(user1, ["Delhi", "India"]); // Hi, I am Hemant from Delhi, India

// Same result as call, just argument format differs.


// #3. Bind: Returns a new function with 'this' permanently bound, which can be called later.
// 'this' is permanently bound to the object that pass as the FIRST argument to bind.

// Syntax: const newFn = fn.bind(thisArg, arg1, arg2, ...)
const greetHemant = greet.bind(user1, "Delhi", "India");
greetHemant(); // // Hi, I am Hemant from Delhi, India

// bind returns a new function.
// this is permanently fixed means where ever we call greetHemant() method it will give the same result every time.



// Now, some good ques and use of call, apply, and bind.

// #1. Problem:
const user = {
  name: "Hemant",
  greet() {
    console.log(this.name);
  }
};

setTimeout(user.greet, 1000); // ❌ undefined
// above when setTimeout() come to call stack, it lost the context of 'user'.

// Solution:
setTimeout(user.greet.bind(user), 1000); // Hemant
// Now, context is not lost.


// #2. Borrowing methods (IMPORTANT)
const userB = {name:"Piyush"};
user.greet.call(userB); // Piyush