
const textInput = document.getElementById('text-input');
const addTodoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

let todos = [{name: "hemant", id: 25}, {name: "piyush", id: 43}];
todos.forEach((todo)=>createTodo(todo));

addTodoBtn.addEventListener("click", () => {
    const todo = textInput.value;
    textInput.value = "";
    const todoLi = {
        name: todo,
        id: Date.now()
    }
    todos.push(todoLi);
    createTodo(todoLi);
})

function createTodo(todoLi){
    const todoDiv = document.createElement("div");
    const h3 = document.createElement("h3");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    
    h3.setAttribute("class", "todo-name");
    deleteBtn.setAttribute("class", "todo-delete");
    editBtn.setAttribute("class", "todo-edit");
    todoDiv.setAttribute("class", "todo-element");
    todoDiv.setAttribute("id", todoLi.id);
    
    deleteBtn.textContent = "Delete";
    editBtn.textContent = "Edit";
    h3.textContent = todoLi.name;

    todoDiv.append(h3, editBtn, deleteBtn);
    todoList.append(todoDiv);
}



todoList.addEventListener("click",(e)=>{
    if(e.target.classList.contains("todo-delete")){
        const todoDiv = e.target.parentElement;
        const currentTodoId = Number(todoDiv.id);
        
        todoDiv.remove();
        todos = todos.filter((todo)=>todo.id !== currentTodoId);
        
    }else if(e.target.classList.contains("todo-edit")){
        const todoDiv = e.target.parentElement;
        const currentTodoId = Number(todoDiv.id);
        const editedTodo = prompt("Give edited value");
        
        const h3 = todoDiv.querySelector("h3");        
        h3.textContent = editedTodo;

        todos = todos.map((todo)=>{
            if(todo.id === currentTodoId){
                return {
                    ...todo,
                    name: editedTodo
                }
            }
            return todo;
        })
        
    }
})