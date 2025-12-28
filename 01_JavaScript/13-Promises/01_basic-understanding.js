// 1. Promise is an object that represents the eventual result of an asynchronous operation. // for self: instead of returning the result, the asynchronous method returns a promise to supply the value at some other point in time.

// 2. It allows you to handle asynchronous tasks like fetching data, reading files, or waiting for a timeout without blocking the main thread.

// 3. It have 3 states : (i)pending (ii)fulfilled (iii)rejection

// 4. First it goes into pending state, from pending either it will go in resolved state or Reject State.

// 5. If a promise is fulfilled then it call resolve() method means .then(). If it is rejected then it call reject() method means .catch().

// 6. Promises help us manage asynchronous code more efficiently and avoid callback hell (deeply nested callbacks).

// 7. Async/Await: The await keyword can only be used inside an async function. The await keyword makes the function pause the execution and wait until the promise is not resolved.

// 8. Async/Await is just a cleaner way to write Promise code:


// E.g-1:

const newPromise = new Promise((resolve, reject)=>{

    // Do an async task like: DB calls, cryptography, network calls, timeout
    // E.g:
    setTimeout(()=>{
        const error = false;

        if(!error){
            resolve("I'm resolve");
        }else{
            reject("ERROR: I'm reject")
        }
    },2000);
})
.then((data)=>{
    console.log(data);
    return ("I'm data: ", data);
}).then((returnValueFromAboveThen)=>{
    console.log(returnValueFromAboveThen);   
}).catch((err)=>{
    console.log(err);  
}).finally(()=>{
    console.log("I will always run");  
})

    

// Another way: use async/await instead of then(), catch();

async function newPromiseAnotherWay(){

    try{
        const response = await newPromise;
        console.log(response);
    }
    catch(err){
        console.log(err);       
    }   
}
newPromiseAnotherWay();



// E.g:
async function getAllUser(){

//    const response = await fetch("https://jsonplaceholder.typicode.com/users"); //getting response from api.
//    console.log(typeof(response), " ", response); //this response is object.

//    const data = await response.json(); //whatever response we get convert it into json becoz we can easily use json data. Also, converting response to json takes time so use await with it.
//    console.log(data);
   
    //use try catch block to handle error. Becoz async await can't handle the error itself.
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        console.log(typeof(response), "--->", response);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("ERROR:", error);        
    }    
}
getAllUser();