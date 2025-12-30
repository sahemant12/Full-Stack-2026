// Debounce
// My Words: when we search for something and start typing, instead of sending API calls for each keystroke, debounce helps to send only one API call after a few seconds of inactivity.
// Definition: Debounce prevents multiple API calls by ensuring a fn call runs only once after the user stops typing for a certain delay.
// Mummy-bachi example: Suppose ek bacha ro raha hai chocolate khane ke liye. Uski mummy boli agar 5 mins chup rahega toh chocolate de dungi. Bacha 3 mins chup raha phir rone laga, phir usko 5 mins chup rahna hai, wo phir 4 mins chup raha aur phir rone laga. Jab tak wo bacha 5 mins tak chup nahi rahega usko chocolate nahi milega. 

// Code
function debounceCode(fn, delay){
    let timeoutId;
    return function(...args){
        clearTimeout(timeoutId);
        timeoutId = setTimeout(()=>{
            fn.apply(this, args);
        }, delay);
    }
}
 
function greet(name){
    console.log(`Hello, ${name}`);   
}
// Another and better way:
const debouncing = debounceCode(greet, 2000);
debouncing("Hemant");
debouncing("Zatch");
debouncing("Raj");


// 1. `debounceCode(greet, 2000)` returns a function, which is stored in the variable `debouncing`.

// 2. First time calling `debouncing()`:
//    1. `clearTimeout(timeoutId)` does nothing because `timeoutId` is `undefined`.
//    2. `setTimeout()` is registered and its reference ID is assigned to `timeoutId`.

// 3. Second time calling `debouncing()`:
//    1. `clearTimeout(timeoutId)` runs and cancels the previous `setTimeout()` that was still in the queue.
//    2. A new `setTimeout()` is registered and its reference is stored in `timeoutId`.
//    3. After the delay (2 seconds), this `setTimeout()` moves to the call stack for execution.
//    4. Inside `setTimeout()`, `fn.apply(this, args)` runs.
//       - `this` refers to the correct context of the calling function.
//       - `args` contains the arguments passed to `debouncing()`.
//    5. Finally, the `greet()` function is executed with the correct argument.




// const debouncing = debounceCode(()=> greet("Hemant"), 2000);
// debouncing(); // because debouncing have same returned fn.
// debouncing();
// debouncing();
// debouncing();


// ✅ Why do we use fn.apply(this, args) inside setTimeout()?
// When setTimeout() runs its callback after the delay, that callback is executed in the global context (window in browsers or global in Node.js) by default.

// This means:

// If we call fn() directly inside setTimeout(),
// the value of this inside fn might be lost or become incorrect.

// Using fn.apply(this, args) ensures that:

// The original this context (from when the debounced function was called) is preserved.

// The arguments (args) are passed correctly to fn.


//USE-CASE:
//1. Search input (auto-complete):
// When a user types in a search box, debounce waits until the user stops typing for, say, 300ms, then sends an API call to fetch suggestions.
// Without debounce, API calls would be sent for every keystroke, causing unnecessary load and slow UI.

//2. Scroll event:
// Debounce can be used to detect when a user stops scrolling before triggering expensive operations like lazy loading or animations.

//3. Button click spam protection:
// If a button triggers a costly operation, debounce can prevent the function from running multiple times if the button is clicked rapidly.