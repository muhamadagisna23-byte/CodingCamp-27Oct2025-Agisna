/// local array to store todo item
let todos = [];

function validateForm(todo, date) {
    if (todo.trim() === '' || date === '') {
        return false;
    }
    return true;
}

/// Function to add a new todo item
function addTodo() {
    const todoInput = document.getElementById('todo-input').value;
    const todoDate = document.getElementById('todo-date').value;

    if (!validateForm (todoInput, todoDate)) {
        alert('form validation failed. please check your inputs.');
    } else {
        // Add to local array
        todos.push ({ task: todoInput, dueDate: todoDate });
        console.log ('current Todos:', todos);
        renderTodos();

        // Clear input fields
        document.getElementById('todo-input').value = '';
        document.getElementById('todo-date').value = '';

    }        
    
}

/// function to delete todo item by index
function deleteTodo(index) {
    const confirmDelete = confirm(`Are you sure you want to delete "${todos[index].task}"?`);
    if (confirmDelete) {
        todos.splice(index, 1); 
        renderTodos(); 
    }
}

/// Function to clear all todos
function clearAllTodos() {
    if (todos.length === 0) {
        alert('No todos to clear!');
        return;
    }
    
    const confirmClear = confirm('Are you sure you want to delete all todos?');
    if (confirmClear) {
        todos = []; // Kosongkan array
        renderTodos(); // Render ulang
        alert('All todos have been cleared!');
    }
}

/// Function to filter todos by search keyword
function filterTodo() {
    const filterText = prompt('Enter keyword to filter todos (by task or date):');
    
    if (filterText === null || filterText.trim() === '') {
        // Jika user cancel atau input kosong, tampilkan semua todos
        renderTodos();
        return;
    }
    
    const filteredTodos = todos.filter(todo =>
        todo.task.toLowerCase().includes(filterText.toLowerCase()) ||
        todo.dueDate.includes(filterText)
    );
    
    if (filteredTodos.length === 0) {
        alert('No todos found matching your filter!');
        renderTodos(); // Tampilkan semua todos
    } else {
        renderTodos(filteredTodos);
        alert(`Found ${filteredTodos.length} todo(s) matching "${filterText}"`);
    }
}

///function to render todo item to the DOM
function renderTodos(list = todos) {
    const todoList = document.getElementById('todo-list');

    //Clear existing list
    todoList.innerHTML = '';

    // Check if list is empty
    if (list.length === 0) {
        todoList.innerHTML = '<li>No todos available</li>';
        return;
    }

    //Render each todo item
    list.forEach((todo, index) => {
        todoList.innerHTML += `
        <li style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid #ddd;">
            <span>${todo.task} - ${todo.dueDate}</span>
            <button class="delete-btn" 
                        style="background:#f87171;padding:6px 10px;border:none;border-radius:6px;color:white;cursor:pointer"
                        onclick="deleteTodo(${index})">Delete</button>
        </li>`;
    });
}

// Event listeners for buttons
document.getElementById('clear-all-btn').addEventListener('click', clearAllTodos);
document.getElementById('filter-todos-btn').addEventListener('click', filterTodo);