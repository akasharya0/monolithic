const express = require('express');
const app = express.Router();

let books = [
    { id: 1, book: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 2, book: "1984", author: "George Orwell" },
    { id: 3, book: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 4, book: "Moby-Dick", author: "Herman Melville" }
];

// Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Get a book by id
app.get('/books/:id', (req, res) => {
    const book = books.find(item => item.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
});

// Add a new book
app.post('/books', (req, res) => {
    const { book, author } = req.body;
    if (!book || !author) {
        return res.status(400).json({ message: 'Book title and author are required.' });
    }
    const newId = books.length ? Math.max(...books.map(item => item.id)) + 1 : 1;
    const newBook = { id: newId, book, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Update a book by id
app.put('/books/update/:id', (req, res) => {
    const { book, author } = req.body;
    const bookIndex = books.findIndex(item => item.id === parseInt(req.params.id));

    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    if (!book || !author) {
        return res.status(400).json({ message: 'Book title and author are required.' });
    }

    books[bookIndex].book = book;
    books[bookIndex].author = author;

    res.json(books);
});

// Delete a book by id
app.delete('/books/delete/:id', (req, res) => {
    const bookIndex = books.findIndex(item => item.id === parseInt(req.params.id));

    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    books.splice(bookIndex, 1);
    res.status(200).json({ message: 'Book deleted successfully', books });
});

module.exports = app;
