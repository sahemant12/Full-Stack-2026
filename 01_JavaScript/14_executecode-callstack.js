// ######## Simple my definition: 

// 1. When we execute the program then all the tasks pushed into the call stack, finished their execution and poped out of call stack.
// 2. But when there is asynchronous blocking tasks like promises or setTimeout then browser register it until timeout end and promise is resolved.
// 3. When promises is resolve then browser send it to the microtask queue and setTimeout to the callback Queue. 
// 4. There is process called 'Event Loop' which continuously checking whether the call stack is empty or not. If call stack is empty then it send all the tasks of the microtask queue to the call stack for execution. Then when all microtask queue tasks executed completely and call stack is empty then Event loop send all the tasks of the callback queue to the call stack for execution. This is how code is executed in js.
// 5. Microtask queue have higher priority than callback queue.

// NOTE: Microtask queue: promises, then(), catch()
// callback queue: setTimeout, setInterval, DOM events

// ######## Simple my definition(better): 

// 1. When we execute the program then all the tasks in sequence manner pushed to the top of `call stack`, finishes their execution and popped out of the call stack.
// 2. But when there is asynchronous blocking tasks like `setTimeout()` or `Promises` then the browser register it for execution when the timeout end or promise is resolve.
// 3. When the timeout end then browser send the tasks like `setTimeout()` to the `callback queue` and the tasks like `Promises` to the `microtask queue`. They are waiting for the `call stack` to get empty so that these tasks can get executed.
// 4. There is process called `Event Loop` that continuously checking whether the call stack is empty or not. If it is empty then first, it put all the tasks of `microtask queue` to the `call stack` for execution, it don't put tasks of `callback queue` because it has lower priority then `microtask queue`.
// 5. When all the tasks of `microtask queue` get executed then `Event Loop` put all the tasks of `callback queue` to the `call stack` for execution. This is how code get executed in JavaScript.


// E.g:

console.log("START");

setTimeout(()=>{
    console.log("I'm 1st timeout");   
}, 2000);

Promise.resolve().then(()=>{ // ~~ new Promise((resolve, reject)=>resolve()).then(console.log())
    console.log("I'm 1st Promise");   
});

setTimeout(()=>{
    console.log("I'm 2nd timeout");   
}, 0);

Promise.resolve().then(()=>{
    console.log("I'm 2nd Promise");
    Promise.resolve().then(()=>{
        console.log("I'm 3rd Promise");
        Promise.resolve().then(()=>{
            console.log("I'm 4th Promise");           
    })
    })
})

console.log("END");
