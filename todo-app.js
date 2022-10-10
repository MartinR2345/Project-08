// From line 2 to line 3, I grabbing from the DOM the elements I want to use with the document.querySelector() and saving them to variables
const todoItems = document.querySelector('#todos')
const todoForm = document.querySelector('#todo-form')


// On line 7, I'm fetch any existing "todos" from localStorage by checking to see if the JSON data actually exists by seeing if it's not equal to null
const getFromLocalStorage = () => {
    const todosJSON = localStorage.getItem('todos')
    return todosJSON !== null ? JSON.parse(todosJSON) : [] 
}


// On line 14, I created a variable called "todos" and assigning it to this function "getFromLocalStorage"
let todos = getFromLocalStorage();


// On line 18, I'm adding/saving the todos to the localStorage
const addToLocalStorage = (todos) => {
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

// On line 50, I made a filter's object.  This is going to keep track of the latest data.  This changes as the "searchText" search input changes down at the very bottom.
const filters = {
    searchText: ''
}

// From line 55 to line 99, (A-1) Get the DOM elements for an individual note.  This will generate the todo DOM element by taking the todo data and creating individual paragraphs with checkboxes and remove buttons.  This generates the todo element, which makes up the little element we show for each todo, that is the checkbox, our text and our button.
const generateTodoDOM = (todo) => {
    //Setup a root element (div) 
    const todoElement = document.createElement('div');

    //Create checkbox
    const checkbox = document.createElement('input')
    // Setup todo checkbox 
    checkbox.setAttribute('type', 'checkbox')
    //(C-1) PART 1 - 
    checkbox.checked = todo.completed
    todoElement.appendChild(checkbox)
    //(C-1) Part 2 - add an eventListener on checkbox that listens for a change event basically gets fire when the checkbox gets checked or unchecked
    checkbox.addEventListener('change', function () {
        //Call "toggleTodo" - Toggle the todo by id
        toggleTodo(todo.id)
        //Calt addToLocalStorage which is passing in my list 
         addToLocalStorage(todos)
        //Call renderTodos which will render this new list with the one item removed 
        renderTodos(todos, filters)
    })

    //Create todoText
    const todoText = document.createElement('span')
     //Setup the todo text by changing the text content for that span with textContent then appending the text element to the div
     todoText.textContent = todo.text
     todoElement.appendChild(todoText)


    //Setup the removeButton
    const removeButton = document.createElement('button');
    removeButton.textContent = 'x'
    todoElement.appendChild(removeButton)
    //(R-1) - removeButton part 1
    removeButton.addEventListener('click', function(){
        //Call to removeTodo which I'm passing todo.id that comes from the parent scope "todo" in generateTodoDOM
        removeTodo(todo.id)
        //Call tt addToLocalStorage which is passing in my list 
        addToLocalStorage(todos)
        //Call to renderTodos which will render this new list with the one item removed 
        renderTodos(todos, filters)
    })

    //I'm returning todoElement from this function
    return todoElement 
}


// On line 103, (A-2) Get the DOM elements for list summary.  This function "generateSummary" is creating an h2 element and saving it to a variable called "summmary" and using the textContent to write a text then I'm returning that summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}


// On line 111, I'm rendering/displaying the todos application on the screen with this renderTodos function
const renderTodos = function (todos, filters) {   
    //This line of code basically clears the div before rendering anything into it otherwise I’m going to get duplicate data.
    todoItems.innerHTML = ''

    const filteredTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    //This line of code is looking at the filtered list.  This is going to make sure to only count the incomplete todos in the ones that we’re actually able to see.
    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })


    //(A-2)This is rendering or displaying the incompleted todos to the web browser by creating an h2 tag and it appends it to the div with the ID of todos
    todoItems.appendChild(generateSummaryDOM(incompleteTodos))


    //(A-1)This is rendering or displaying the individual paragraphs by appending my function "generateTodoDOM"
    //This if statement basically is stating if there are todos to show, then render them 
    //The else statement basically is stating if there are no todos to show then render a paragraph instead and add a class empty message and some text message like "No to-dos to show"
    if (filteredTodos.length > 0){
        filteredTodos.forEach(todo => {
            todoItems.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos to show'
        todoItems.appendChild(messageEl);
    }
}

// On line 145, I'm calling the function renderTodos
renderTodos(todos, filters)


// On line 149, (R-1) removeButton PT2 (I made a "removeTodo" function that removes todo by ID)
const removeTodo = (id) => {
    const todoIndex = todos.findIndex(todo => {
        return todo.id === id
    })

    //This finds out if we have a match
    if (todoIndex > -1 ){
        //I'm passing in the todoIndex and the number of things I want to remove which is 1
        todos.splice(todoIndex, 1)
    }
}

// On line 163, (C-1) PT2 (I created a function called "toggleTodo" and this will toggle the completed value for a given todo)
const toggleTodo = (id) => {
    //I'm using the find() method to find the object and return the actually match 
    const todo = todos.find(todo => {
        //Return true when it finds a match
        return todo.id === id
    })

    //Now there is a chance if it doesn't find a match then I want to modified it by getting the current value, flipping it and then store that as the new value.
  if (todo) {
        todo.completed = !todo.completed
    }
}