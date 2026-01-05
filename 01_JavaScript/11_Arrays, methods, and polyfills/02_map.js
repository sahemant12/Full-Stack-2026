//1. does not change the original array.   
//2. does not execute the function for empty elements.  
//3. creates a new array by transforming each element.

//syntax: array.map(function(currentValue, index, arr), thisValue);

const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);
// console.log(doubled); // Output: [2, 4, 6, 8]
// console.log(numbers);

//e.g:2
const rannumbers = [65, 44, 12, 4];
const newObj = {
    name:"sah",
    age:"20",
    arr:[1, 2, 3, 4, 5, 6],
    fun2(){
        String = "hello"
    }
}
// const newArr = rannumbers.map((num, index, arr)=>{
//     console.log(num, index, arr);
//     return index*10;
// });
// const newArr2 = newObj.map((num, index, arr)=>{   //not work with object
//     console.log(num, index, arr);
//     return num;
// });
// console.log(newArr);
