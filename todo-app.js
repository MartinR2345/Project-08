// From line 2 to line 3, I grabbing from the DOM the elements I want to use with the document.querySelector() and saving them to variables
const todoItems = document.querySelector('.todo-items');
const todoForm = document.querySelector('.todo-form');


// On line 7, I'm fetch any existing "todos" from localStorage by checking to see if the JSON data actually exists by seeing if it's not equal to null
const getFromLocalStorage = () => {
    const todosJSON = localStorage.getItem("todos")
    return todosJSON !== null ? JSON.parse(todosJSON) : [];
}


// On line 14, I created a variable called "todos" and assigning it to this function "getFromLocalStorage"
let todos = getFromLocalStorage();


// On line 18, I'm adding/saving the todos to the localStorage
const addToLocalStorage(todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// From line 23 to line 47, basically
// When a user submits the HTML form by clicking on the button, it is doing a couple of things:
// Cancel the default behavior -- preventing the page from refreshing with an updated URL
// I created a variable called "text" that returns all the elements in an HTML Form.  I'm using the trim() method on that string to get the trimmed version for the text value
// I'm using an if statement that checks the text length so I can only add the new todo when there's content in the text-field.  A user can't add a new todo without typing something in the text-field
// I created a new object called "todo".  Each todo/item is going to be a JavaScript object with three properties: id - a unique identifier for the todo item, text - which holds whatever the user types into the text input-field, and completed which helps know if a task has been marked completed or not
// I'm pushing the todo object into the "todos" then adding it to the local storage and rendering/displaying them onto the screen
// Clearing the input value
todoForm.addEventListener('submit', function (e) {
    e.preventDefault()
    
    const text = e.target.elements.text.value.trim();

    if (text.length > 0){
        const todo = {
            id: uuidv4(),
            text,
            completed: false
        }

        todos.push(todo);
        addToLocalStorage(todos)
        renderTodos(todos, filters)
        e.target.elements.text.value = ''
    }
})

