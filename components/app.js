// components/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [book, setBook] = useState('');
  const [author, setAuthor] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('/api/auth/register', { username, password });
      alert('User registered successfully');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      setToken(response.data.token);
      alert('Login successful');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data.data);
    } catch (err) {
      setError('Failed to fetch books');
    }
  };

  const handleAddBook = async () => {
    try {
      const response = await axios.post('/api/books', { book, author });
      alert('Book added successfully');
      fetchBooks();
    } catch (err) {
      setError('Failed to add book');
    }
  };

  return (
    <div>
      <h1>Welcome to Bookstore</h1>
      <div>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>

      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>

      {token && (
        <>
          <h2>Books</h2>
          <button onClick={fetchBooks}>Fetch Books</button>
          <ul>
            {books.map((book) => (
              <li key={book.id}>{book.book} by {book.author}</li>
            ))}
          </ul>

          <h2>Add New Book</h2>
          <input
            type="text"
            placeholder="Book Title"
            value={book}
            onChange={(e) => setBook(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button onClick={handleAddBook}>Add Book</button>
        </>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default App;
