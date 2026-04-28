
// Understand:
// click // Triggered when user clicks.
// input // Triggered/Fires every time user types(Every keystroke).
// submit // Triggered when user submits a form.
// change // 👉 Fires after user finishes input. 
// keydown // Triggered when user presses a key.
// mouseover // Triggered when user moves mouse over an element.

// | Event  | When            |
// | ------ | --------------- |
// | input  | every keystroke |
// | change | after finish    |


const btn = document.getElementById('maiBtnHu');
const textInput = document.getElementById('textInput');
const submitBtn = document.getElementById('submitBtn');
const mouseOverBtn = document.getElementById('mouseOver');

btn.addEventListener('click', () => {
    console.log('Button clicked!');
});

textInput.addEventListener('input', () => {
    console.log('Text input input!');
});

submitBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submitted!');
});

textInput.addEventListener('change', () => {
    console.log('Text input changed!');
});

btn.addEventListener('keydown', () => {
    console.log('Key down!');
});

mouseOverBtn.addEventListener('mouseover', () => {
    console.log('Mouse over!');
});