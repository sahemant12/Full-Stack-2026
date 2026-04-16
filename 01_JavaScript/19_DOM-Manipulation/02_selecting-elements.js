
// 1. document.getElementById()
// Used to select one element by its unique id.
// Returns the element or null if not found.
// Very fast

// Example:
{/* <h1 id="title">Hello</h1> */}
// let element = document.getElementById("title");
// console.log(element); // <h1 id="title">Hello</h1>


// 2. document.getElementsByClassName()
// Used to select all elements having same class name.
// Returns a live HTMLCollection (array-like object).
// Can select multiple elements with the same class.

// Example:
{/* <div class="item">Item 1</div>
<div class="item">Item 2</div>
<div class="item">Item 3</div> */}
// let elements = document.getElementsByClassName("item");
// console.log(elements); // HTMLCollection(3)


// 3. document.getElementsByTagName()
// Used to select all elements having same tag name.
// Returns a live HTMLCollection (array-like object).
// Can select multiple elements with the same tag.

// Example:
{/* <div>Div 1</div>
<div>Div 2</div>
<div>Div 3</div> */}
// let elements = document.getElementsByTagName("div");
// console.log(elements); // HTMLCollection(3)



// 4. document.querySelector()
// Used to select the first element that matches a CSS selector.
// Returns the first matching element or null if not found.
// Can select elements by id, class, tag, or any other CSS selector.
// document.querySelector("#id")
// document.querySelector(".class")
// document.querySelector("div p")
// document.querySelector("div.item")

// Example:
{/* <div class="item">Item 1</div>
<div class="item">Item 2</div>
<div class="item">Item 3</div> */}
// let element = document.querySelector(".item");
// console.log(element); // <div class="item">Item 1</div>


// 5. document.querySelectorAll()
// Used to select all elements that match a CSS selector.
// Returns a static NodeList (array-like object).
// Can select multiple elements that match the selector.

// Example:
{/* <div class="item">Item 1</div>
<div class="item">Item 2</div>
<div class="item">Item 3</div> */}
// let elements = document.querySelectorAll(".item");
// console.log(elements); // NodeList(3)

// Difference Summary Table
// | Method                 | Selects         | Returns        |
// | ---------------------- | --------------- | -------------- |
// | getElementById         | By ID           | Single Element |
// | getElementsByClassName | By Class        | HTMLCollection |
// | getElementsByTagName   | By Tag          | HTMLCollection |
// | querySelector          | First CSS Match | Single Element |
// | querySelectorAll       | All CSS Matches | NodeList       |


// HTMLCollection vs NodeList
// HTMLCollection is live (changes to DOM reflect immediately)
// NodeList is static (snapshot at time of query)

// Example:
// HTMLCollection (live)
// let elements = document.getElementsByClassName("item");
// elements.length; // 3
// // Add a new item
// document.body.innerHTML += '<div class="item">Item 4</div>';
// elements.length; // 4 (automatically updated)

// NodeList (static)
// let elements = document.querySelectorAll(".item");
// elements.length; // 3
// // Add a new item
// document.body.innerHTML += '<div class="item">Item 4</div>';
// elements.length; // 3 (unchanged)


// #1. When to Use querySelector vs getElementById
// Use getElementById when selecting by ID (fastest)

// Use querySelector when you need more complex selectors
// document.querySelector("div .box > p")
// Multiple selector flexibility: #id, .class, tag, nested selectors, attribute selectors


// #2. When to Use getElementsByClassName vs querySelectorAll
// getElementsByClassName returns an HTMLCollection (live)
// // querySelectorAll returns a NodeList (static)
// | Feature          | getElementsByClassName | querySelectorAll |
// | ---------------- | ---------------------- | ---------------- |
// | Selector Type    | Class only             | Any CSS selector |
// | Return Type      | HTMLCollection         | NodeList         |
// | Live Updates     | Yes                    | No               |
// | Supports forEach | Usually No             | Yes              |
// | Modern Usage     | Less common            | Very common      |


// ####### why Most developers prefer querySelectorAll and querySelector: ##########

// Give me the elements exactly as they exist right now. Not “Keep changing this list automatically behind my back.”

// 1. Problem With Live Collections
// Suppose you have:
{/* <div class="item">1</div>
<div class="item">2</div>
<div class="item">3</div> */}

// let items = document.getElementsByClassName("item");
// Now imagine looping and removing them:
// for (let i = 0; i < items.length; i++) {
    //     items[i].remove();
    // }


// 2. Another Reason: Flexibility
// querySelectorAll lets you use any CSS selector:
// document.querySelectorAll("div.item") // All divs with class item
// document.querySelectorAll("p:first-child") // First p in each parent
// document.querySelectorAll("[data-id='123']") // Elements with specific attribute
// document.querySelectorAll("ul li:nth-child(2)") // Complex nested selectors

// getElementsByClassName only lets you select by class name