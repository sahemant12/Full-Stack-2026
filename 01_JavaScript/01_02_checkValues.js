function checkTruthValue(value){
    if(value){
        console.log("True: ", value);       
    }else{
        console.log("False: ", value); 
    }   
}
// checkTruthValue([]); //okay: empty sq/braces bracket return true;
// checkTruthValue({});
// checkTruthValue(0);
// checkTruthValue(1);
// checkTruthValue("hemant");
// checkTruthValue("");
// checkTruthValue([1, 2, 3]);
// checkTruthValue(null); //false
// checkTruthValue(undefined); //false
// checkTruthValue(NaN); //false

//NOTE-1: [] and {} are objects, and all objects are truthy in Js even empty.
//NOTE-2: only 6 values in Js are falsy: 0, false, "", undefined, NaN, null

let a = "100w";
const convertNum1 = Number(a); //Best practice //NaN
const convertNum2 = +a; //another way //NaN // + is shorthand for Number()
const convertNum3 = parseInt(a); //another way //100 // Stops at first non-digit
console.log(convertNum1, convertNum2, convertNum3);