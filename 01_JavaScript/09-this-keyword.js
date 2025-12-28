// this refers to the object that calls the function. E.g:
const user = {
  name: "Hemant",
  greet() {
    console.log(this.name);
  }
};

user.greet(); // here, user is calling the fn so this belongs to user.

// Basic Rule of 'this' in JavaScript

// 1. Global scope(non-strict) and regular fn: this refers to window object.
// 2. Global scope(strict mode): this refers to undefined.
// 3. Inside an object in a method: this refers to current object.
// 4. In class constructor: this refers to instance of class
// 5. In event handlers: this refers to DOM element that triggered the event.
// 6. In Arrow fn: this refers to surrounding(lexical) scope. Because arrow fn do not have their own this.
