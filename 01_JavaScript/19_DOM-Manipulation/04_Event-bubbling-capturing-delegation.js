
// If elements are few and fixed → attach to CHILD.
// If elements are many or dynamic → attach to PARENT (delegation)


<div id="parent">
  <button id="child">Click</button>
</div>

parent.addEventListener("click", () => {
  console.log("Mai Parent Hu");
});

child.addEventListener("click", () => {
  console.log("Mai Child Hu");
});

// Event bubbling
// If we click button → first child then parent (bubbling). Default behavior
// output: 
// Mai Child Hu
// Mai Parent Hu
// child → parent → body → document
// Event goes from child to parent(down -> up)


// Event capturing
// If we click button → first parent then child (capturing).
// output: 
// Mai Parent Hu
// Mai Child Hu
// parent → child → body → document
// Event goes from parent to child(up -> down). opposite of bubbling
parent.addEventListener("click", () => {
  console.log("Parent (capturing)");
}, true); // make it true to enable capturing phase



// Event delegation
// For dynamic or multiple elements, we attach event only to parent. This is called event delegation.
// Use bubbling to handle child events.