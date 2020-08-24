// Selectors
const todoInput = document.querySelector('.todo-input'),
    todoButton = document.querySelector('.todo-button'),
    todoList = document.querySelector('.todo-list'), // ul
    filterToDo = document.querySelector('.filter-todo'); // select
      
 
// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck); // ul
filterToDo.addEventListener("click", filterToDoList);
 
// Functions
function addTodo(e) {
    e.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value; // li - innerText, input - value
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    // Clear TODO Input Value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    // DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement; // div container of li and 2 buttons
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function (){
            todo.remove();
        });
    }
    // CHECK MARK
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
// when there is a click on the select
function filterToDoList(e) {
    // children of ul 
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function (todo) { // todo -> div
        switch (e.target.value) { // value of a definite select
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //CHECK---HEY Do I already have thing in there?
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }

    todos.push(todo); // todo from daveLocalTodos(todo) in addTodo()

    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo; // todo from LS
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //CHECK MARK BUTTON
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //CHECK TRASH BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    //CHECK---HEY Do I already have thing in there?
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoInput), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}