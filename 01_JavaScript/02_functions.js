
// Function writing styles: 4 types

// 1. Function Declaration  
// fully hoisted (can be called before declaration).
// console.log(myName("Hemant Sah"));
function myName(name){
    return `My Name is ${name}`;
}

// 2. Function Expression(Anonymous Fn) 
// hoisted(variable is hoisted but in TDZ, function body not hoisted) (cannot be called before declaration).
const myName2 = function(name){
    return `My Name is ${name}`;
}
// console.log(myName2("Hemant Sah"));

// 3. Arrow Function
// hoisted(variable is hoisted but in TDZ, function body not hoisted) (cannot be called before declaration).
const myName3 = (name) => `My name is ${name}`;
// console.log(myName3("Hemant"));

// 4. Immediately Invoked Function Expression (IIFE) 
// A function that runs immediately after definition. no reuse
(function runme(){
    // console.log("Hello Hemant");
})();


//function returing fn
function createTeaMaker(){
    return function(teaType){
        return `${teaType}: Making green tea`;
    };
}
const teaMaker = createTeaMaker();  //teaMaker is a fn. Since createTeaMaker() is returing fn.
// console.log(teaMaker("Green Tea"));