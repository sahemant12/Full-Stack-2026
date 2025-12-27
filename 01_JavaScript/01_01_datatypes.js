// Datatypes:
//     1. Number
//     2. String
//     3. Boolean
//     4. Bigint
//     5. Undefined
//     6. null
//     7. Object
//     8. Symbol

//Symbol: it is unique value all the time.
let sm1 = Symbol();
let sm2 = Symbol(); //both are different


// loops: loops are only work with arrays but 1 loop(for in) works mainly with object.

//1. for loop
//2. while loop
//3. do while loop

//4. for in loop(key-value)

//E.g-1:
let arr1 = [10,20,30,40];
for(let num in arr1){ // this loop is mainly use for object.
    console.log(num, arr1[num]); // num is acted as index.  
}

//E.g-2:
const obj = {
    name:"hemant",
    age:"21",
    hobby:"singing",
    arr:[1, 2, 3, 4, 5, 6],
    func(){
        let b = 12;
        console.log("b: ", b);       
    },

    iAmFn: function(){
        console.log("Hello");
        
    }
}
for(let key in obj){ // main usecase of for in loop
    console.log(key, obj[key]);  
}
obj.func();
obj.iAmFn();


//5. for of loop: use only with iterable things like array, string
let arr2 = [1, 9, 10, 100];
for(let num of arr2){
    console.log(num); 
};

//NOTE-1: Always remember: 1. Objects are NOT iterable. 2. Arrays are iterable.

//NOTE-2: forEach, map these are iteration methods that works only with array.
