
// For interview perpective:
// Throttling
//1. limit how often a function can run over time. It ensures the function is called at most once every specified interval, no matter how many times the event is triggered.

//2. 🔄 How Throttling Works:
// i: When a throttled function is called repeatedly, it runs immediately the first time.

// ii: Then it blocks further calls for the set delay time.

// iii: After the delay, if the function was called during the block, it runs again.

// iv: This repeats, so the function runs periodically at fixed intervals during continuous events.
 
function throttlingCode(fn, delay){
    let timeoutId = null;
    
    return function(...args){     
        if(timeoutId === null){
            fn(...args);
            timeoutId = setTimeout(()=>{
                timeoutId = null;
            }, delay);
        }
    }
}

function ekBaarRun(naam){
    console.log(`Hello my naam is: ${naam}`);   
}

const throttling = throttlingCode(ekBaarRun, 2000);

throttling("hemant");
throttling("Zatch");
throttling("Raj");

// E.g-1: 
// Problem (without throttle)
window.addEventListener("scroll", () => {
  console.log("scrolling");
});
// Fires hundreds of times per second, performance get worst.

// Solution (with throttle)
window.addEventListener(
  "scroll",
  throttle(() => {
    console.log("scrolling");
  }, 1000)
);
// 1. Function runs once every 1 second. Scrolling get controlled.

// E.g-2: Button click protection
button.addEventListener(
  "click",
  throttle(submitForm, 2000)
);
// 1. Prevents multiple submissions.
// 2. Allows only one click every 2 seconds.
