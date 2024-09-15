$(document).ready(function() {
    // Set a cookie
    const setCookie = (name, value, days) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value || "") + expires + "; path=/";
    };

    // Get a cookie by name
    const getCookie = (name) => {
        const nameEQ = name + "=";
        const cookies = document.cookie;
        const startIdx = cookies.indexOf(nameEQ);

        if (startIdx === -1) {
            return null;
        }

        let endIdx = cookies.indexOf(';', startIdx);
        if (endIdx === -1) {
            endIdx = cookies.length;
        }

        return decodeURIComponent(cookies.substring(startIdx + nameEQ.length, endIdx));
    };

    // Load saved todos from cookies and render them
    const loadTodos = () => {
        const todosCookie = getCookie('todos');
        let todos = [];
        console.log('Raw todos cookie:', todosCookie); // Log the raw cookie value

        if (todosCookie) {
            try {
                todos = JSON.parse(todosCookie); // Try parsing the cookie
            } catch (e) {
                console.error('Error parsing todos cookie:', e);
                setCookie('todos', '', -1); // Clear invalid cookie
                todos = []; // Reset todos
            }
        }
        $('#ft_list').empty(); // Clear the list first
        todos.forEach(todo => {
            $('#ft_list').append(`<div class="todo">${todo}</div>`); // Append to the bottom
        });
    };

    // Save todos to cookies
    const saveTodos = () => {
        const todos = [];
        $('.todo').each(function() {
            todos.push($(this).text());
        });
        const todosString = JSON.stringify(todos);
        console.log('Saving todos:', todosString); // Log the todos being saved
        setCookie('todos', todosString, 7); // Save cookies for 7 days
    };

    // Add new todo
    $('#new').click(function() {
        const todo = prompt('Enter a new task:');
        if (todo) {
            $('#ft_list').append(`<div class="todo">${todo}</div>`); // Append to the bottom
            saveTodos(); // Save after adding a new todo
        }
    });

    // Remove todo on click
    $('#ft_list').on('click', '.todo', function() {
        if (confirm('Do you want to remove this task?')) {
            $(this).remove();
            saveTodos(); // Save after removing a todo
        }
    });

    // Load todos when the page loads
    loadTodos();
});
