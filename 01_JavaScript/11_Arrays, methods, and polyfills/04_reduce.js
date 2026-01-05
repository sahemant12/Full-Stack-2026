//1. The reduce() method does not change the original array.
//2. The reduce() method returns a single value: the function's accumulated result.
//3. The reduce() method executes a reducer function for array element.
//4. The reduce() method does not execute the function for empty array elements.
//NOTE: reducer() is more than this. Check from Internet: mdn
//syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)

//Example-1: Sum of Array Elements with initial value.
// const numbers = [8, 12, 40, 100];
// const total = numbers.reduce((acc, num, index, arr)=>{
//     console.log(acc, num, index, arr);
//     return acc+num;
// },0);
// console.log(total); 

//Example-2: Sum of Array Elements without initial value.
//accumulator take array 1st element as its value and start the fn from index 1
// const numbers1 = [8, 12, 40, 100];
// const total = numbers1.reduce((acc, num, index, arr)=>{  //not work with object.
//     console.log(acc, num, index, arr);
//     return acc+num;
// });
// console.log(total);

//E.g-3
// const array1 = [1, 2, 3, 4];
// let expenses = [
//     {description: "Groceries", amount:50, category: "Food"},
//     {description: "Electricity Bill", amount:100, category: "Utilities"},
//     {description: "Dinner", amount:30, category: "Food"},
//     {description: "Internet Bill", amount:150, category: "Utilities"}
// ]

// const initialValue = 0;
// const undestandReduce = expenses.reduce((accumulator, currValue)=>{
//     console.log(accumulator, "@", currValue.amount);
//     return "hemant";
// },[1,2,3,4]);
// console.log(undestandReduce);

//Example-4: find the most active user using reduce. Return: that object
// let userActivity = [
//     {user: "Alice", activityCount: 45},
//     {user: "Bob", activityCount: 715},
//     {user: "Martha", activityCount: 33},
//     {user: "Jonas", activityCount: 89},
//     {user: "Zatch", activityCount: 22},
// ];

// const mostActive = userActivity.reduce((acc, currUser)=>{  
//     if(currUser.activityCount>acc.activityCount){
//         return currUser;
//     }  
//     return acc;
// })
// console.log(mostActive);


// Example 5: Count Frequency of Items in Array
// const fruits = ['apple', 'banana', 'apple', 'orange', 'banana'];

// const count = fruits.reduce((acc, currFruit)=>{
//     acc[currFruit] = (acc[currFruit] || 0 ) + 1;
//     return acc;
// }, {})
// console.log(count); // Output: { apple: 2, banana: 2, orange: 1 }


// Use-Case:
// Sum
// Count
// Grouping
// Flatten arrays