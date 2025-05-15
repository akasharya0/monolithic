const apiBaseUrl = 'https://your-vercel-project-url/api';

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
        localStorage.setItem('token', result.token);
    } else {
        message.textContent = result.message;
        message.style.color = 'red';
    }
});

// Load Books
document.getElementById('load-books').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiBaseUrl}/books`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const books = await response.json();
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = '';
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.textContent = `${book.book} by ${book.author}`;
        booksList.appendChild(bookDiv);
    });
});
