const apiBaseUrl = 'https://your-project-name.vercel.app/api';

// Register User
document.getElementById('register-button').addEventListener('click', async () => {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch(`${apiBaseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    const message = document.getElementById('register-message');
    if (response.ok) {
        message.textContent = 'Registration successful!';
        message.style.color = 'green';
    } else {
        message.textContent = result.message;
        message.style.color = 'red';
    }
});

// Login User
document.getElementById('login-button').addEventListener('click', async () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    const message = document.getElementById('login-message');

    if (response.ok) {
        message.textContent = 'Login successful!';
        message.style.color = 'green';
        localStorage.setItem('token', result.token);  // Store JWT Token
    } else {
        message.textContent = result.message;
        message.style.color = 'red';
    }
});

// Load Books
document.getElementById('load-books').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login to view books!');
        return;
    }

    const response = await fetch(`${apiBaseUrl}/books`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const books = await response.json();
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = ''; // Clear previous results

    if (Array.isArray(books)) {
        books.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.textContent = `${book.book} by ${book.author}`;
            booksList.appendChild(bookItem);
        });
    } else {
        booksList.innerHTML = 'No books available.';
    }
});
