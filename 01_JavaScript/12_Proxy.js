//1. A Proxy in JavaScript is an object that wraps another object and allows you to intercept and control how that object behaves.
//2. Basic Syntax: const proxy = new Proxy(targetObject, handlerObject);
//3. The original person object was modified through the proxy. Yes, changing the proxy object also changes the original object.


// Example: UNDERSTANDING_PROXY
const person = {
  name: "Hemant",
  age: 23,
};

const proxy = new Proxy(person, {

  get(target, property) { // target: real object E.g `person` // property: its property E.g: name, age
    console.log("target: ", target);   // target:  { name: 'Hemant', age: 23 }
    console.log("property: ", property); // property:  name
    return target[property]; // Hemant
  },

  set(target, property, value) {
    console.log(`Setting ${property} to ${value}`); // Setting age to 24
    target[property] = value;
  }
});

// console.log(proxy); // { name: 'Hemant', age: 23 }

// Accessing properties
// console.log(proxy.name); // output: Hemant proxy.name trap `get()' method.

// // Changing property
// // proxy.age = 24;           // proxy.age = 24 trap `set()' method.
// console.log(proxy.age);   // 24

// Traps (Handler Methods)


// SELF_PRACTICE
const user = {
    name: "hemant sah",
    age:21,
    password: "@123",
}

const myProxy = new Proxy(user, {
    get(target, property){
        if(property === "password"){
            throw new Error("Access Denied");
        }
        return target[property];
    },

    set(target, property, value){
        target[property] = value;
        return true; // value was successfully set.
    }
});

// console.log(myProxy.password);
// console.log(myProxy.age);
// myProxy.age = 23;
// console.log(myProxy.age);



//Suppose interviewer ask you: how do I get this arr[-1]?
//challenge-1: create your own fn that give value of -ve index.
let arr = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
// console.log(arr[-1]); // undefined

function negativeIndex(arr, index){
    return index>=0 ? arr[index] : arr[arr.length + index];
}
// console.log(negativeIndex(arr, -9)); // 12
// console.log(negativeIndex(arr, 4)); // 15 // Not this way. Get the answer by calling this: console.log(arr[-1]);

// we can do this by using proxy: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy



const negativeIndexProxy = new Proxy(arr, {
        get(target, property){
            let index = Number(property);
            return index>=0 ? target[index] : target[target.length + index];
        },

        set(target, property, value){
            let index = Number(property);
            index>=0 ? target[index] = value : target[target.length + index] = value;
            return true; // value was successfully set.
        }
    });


// console.log(negativeIndexProxy);  // negativeIndexProxy is an array.

// getting -ve index value;
// console.log(negativeIndexProxy[-1]);

// // setting -ve index value;
// negativeIndexProxy[-1] = 695;
// console.log(negativeIndexProxy[-1]);

// console.log(negativeIndexProxy);


//USE_CASE:
//1. Validation:
const user5 = new Proxy({}, {
  set(target, key, value) {
    if (key === "age" && value < 0) {
      throw new Error("Age cannot be negative");
    }
    target[key] = value;
  }
});

user.age = -5;  // ❌ Error: Age cannot be negative

//2. Read-only Objects:
const readonly = new Proxy({ name: "Zatch" }, {
  set() {
    throw new Error("Read-only object");
  }
});

readonly.name = "New Name"; // ❌ Error

//3. Real-Life Use Case: Form Input Validation
const realUserData = {
  name: "Zatch",
  age: 23
};

const formProxy = new Proxy(realUserData, {
  set(target, prop, value) {
    if (prop === "age" && (typeof value !== "number" || value < 0)) {
      console.log("Invalid age. Not updating the real data.");
      return false; // 🚫 Prevents the original object from updating
    }

    console.log(`Temporarily set ${prop} = ${value}`);
    return true; // ✅ Accept the change in proxy only (not saved yet)
  },
  get(target, prop) {
    return target[prop];
  }
});

// Trying to set invalid age
formProxy.age = -10;  // ❌ Won’t affect original data
console.log(realUserData.age);  // 23 ✅

// Trying to set valid age
formProxy.age = 25;
realUserData.age = 25;  // ✅ Save only after validation
console.log(realUserData.age);  // 25

