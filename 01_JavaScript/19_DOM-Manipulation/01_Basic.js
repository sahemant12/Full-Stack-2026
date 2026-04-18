
// 2. Selecting Elements
// document.getElementById()
// document.getElementsByClassName()
// document.getElementsByTagName()
// document.querySelector()
// document.querySelectorAll()


// 3. Changing Content
// innerText
// textContent
// innerHTML

// Difference Table
// | Feature           | innerText | textContent | innerHTML |
// | ----------------- | --------- | ----------- | --------- |
// | Shows hidden text | ❌ No      | ✅ Yes       | ✅ Yes     |
// | Reads CSS layout  | ✅ Yes     | ❌ No        | ❌ No      |
// | Returns HTML tags | ❌ No      | ❌ No        | ✅ Yes     |
// | Performance       | Slow      | Fast        | Medium    |
// | Safe from XSS     | ✅ Yes     | ✅ Yes       | ❌ No      |


// 4. Changing Attributes: Modify attributes dynamically.
// getAttribute()
// setAttribute()
// removeAttribute()
// hasAttribute()


// 5. Styling Elements
// element.style
// classList.add()
// classList.remove()
// classList.toggle() // Adds class if not present, removes if present.
// classList.contains() // Checks if class is present


// 6. Creating / Removing Elements
// createElement()
// appendChild() // Adds an element as the last child of a parent.
// append() // Modern version of appendChild().
// prepend() // Adds an element as the first child of a parent.
// remove() // Removes an element from the DOM.
// removeChild() // Parent removes its child.
// replaceChild() // Replaces a child element with another element.

// Modern JS developers mostly use: createElement(), append(), prepend(), remove()
// They avoid: appendChild(), removeChild(), replaceChild() 




// 7. Traversing DOM
// parentElement // Returns the parent element
// children // Returns all child elements
// firstElementChild // Returns the first child element
// lastElementChild // Returns the last child element
// nextElementSibling // Returns the next sibling element
// previousElementSibling // Returns the previous sibling element
// closest() // Moves upwards and finds the nearest ancestor matching a selector.



// 8. Event Handling (VERY IMPORTANT)
// addEventListener()
// removeEventListener()

// Understand:
// click // Triggered when user clicks.
// input // Triggered every time user types. When it fires: Every keystroke.
// submit // Triggered when user submits a form.
// change // Triggered when user changes a value in a form element. When it fires: After user finishes (blur/enter).
// keydown // Triggered when user presses a key.
// mouseover // Triggered when user moves mouse over an element.

// 9. Event Object
// event.target
// event.currentTarget
// event.preventDefault()
// event.stopPropagation()

// 10. Event Bubbling / Capturing / Delegation

// 11. Forms Handling

// Browser BOM Basics (Optional but Useful)
// window
// alert()
// setTimeout()
// setInterval()
// localStorage
// sessionStorage