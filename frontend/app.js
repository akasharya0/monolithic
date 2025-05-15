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
        message.textContent =
