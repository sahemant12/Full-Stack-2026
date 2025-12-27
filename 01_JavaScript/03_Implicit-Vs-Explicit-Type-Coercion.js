//coresion

//implict vs explict type coercion

//type coercion: means converting value from one datatype to another.

//implict: automatic conversion by Js
// E.g:
let result = "5" + 1;
console.log(result); // "51" (number 1 becomes string)

let result2 = "5" - 1;
console.log(result2); // 4 (string "5" becomes number)
// + prefers string concatenation → converts 1 to "1"
// -, *, / prefer numbers → converts "5" to 5


//explict: manual conversion by developers using built-in methods
// E.g: 
// String to Number
let num = Number("123");   // 123
let num2 = parseInt("42"); //42
let num3 = +"112"    // 112

// Number to String
let str = String(123);     // "123"
let str2 = (123).toString(); // "123"


// NOTE: Very Important: == vs ===
// == : check value only. implicit type coercion happens.
// === : check (value + type) both. No type coercion happens.

// E.g-1:
5 == "5"    // true // "5" converted to 5
5 === "5"   // false

// E.g-2:
0 == false   // true // false is converted to 0
0 === false  // false

// E.g-3:
null == undefined   // true // (special rule) // both not converted to 0
null === undefined // false

// E.g-4:
// [] == 0     // true // [] is converted to 0
// [] === 0    // false
