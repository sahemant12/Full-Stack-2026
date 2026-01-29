const arr = [2, -5, 0, 2, 7, -1, 3];
const arr2 = [-4, -2, -1, 1, 6];
const arr3 = [-10, -5, -2, 2, 15];



function twoSum(arr){

    let start = 0; 
    let end = arr.length -1;
    const sortedArr = arr.sort((a, b)=> a-b);
    console.log(sortedArr);
    

    while(start<=end){
        if(sortedArr[start] + sortedArr[end] == 0) return [start, end];
        else if(arr[start] + arr[end] > 0) end--;
        else start++;
    }
    return [-1, -1]
}

const myTwoSum = twoSum(arr3);
console.log(myTwoSum);
