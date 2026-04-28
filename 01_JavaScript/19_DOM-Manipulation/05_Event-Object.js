
<div id="parent">
  <button id="child">Click Me</button>
</div>


// event.target
// 👉 Actual element that you clicked.
child.addEventListener("click", (e) => {
  console.log(e.target);
}); // <button id="child">


// event.currentTarget
// 👉 Element to which the event listener is attached.
parent.addEventListener("click", (e) => {
  console.log("target:", e.target); // <button id="child">
  console.log("currentTarget:", e.currentTarget); // <div id="parent">
});


// event.preventDefault()
// 👉 Stops default browser behavior.
// Example 1: Form: when submit button is clicked, form is submitted to server without reload of the page.
// Example 2: Link: when clicked, link stop navigation to another page.


// event.stopPropagation()
// 👉 Stops event from going up (bubbling)
parent.addEventListener("click", () => {
  console.log("Parent");
});

child.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("Child");
}); // Child

// without it:
// Child
// Parent