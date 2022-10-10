//From line 2 to line 3, I grabbing from the DOM the elements I want to use with the document.querySelector() and saving them to variables
const todoItems = document.querySelector('.todo-items');
const todoForm = document.querySelector('.todo-form');


// On line 7, I'm fetch any existing "todos" from localStorage by checking to see if the JSON data actually exists by seeing if it's not equal to null
const getFromLocalStorage = () => {
    const todosJSON = localStorage.getItem("todos")
    return todosJSON !== null ? JSON.parse(todosJSON) : []
}


// On line 14, I created a variable called "todos" and assigning it to this function "getFromLocalStorage"
let todos = getFromLocalStorage();


//On line 18, I'm adding/saving the todos to the localStorage
const addToLocalStorage(todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

