// api/books.js
let todo = {
    status: "success",
    data: [
      { id: 1, book: "To Kill a Mockingbird", author: "Harper Lee" },
      { id: 2, book: "1984", author: "George Orwell" },
      { id: 3, book: "The Great Gatsby", author: "F. Scott Fitzgerald" },
      { id: 4, book: "Moby-Dick", author: "Herman Melville" }
    ]
  };
  
  export default function handler(req, res) {
    if (req.method === 'GET' && req.url === '/api/books') {
      // Get all books (GET /api/books)
      return res.json(todo);
    }
  
    if (req.method === 'GET' && req.url.includes('/api/books/')) {
      // Get a book by id (GET /api/books/:id)
      const findbook = todo.data.find(item => item.id === parseInt(req.query.id));
      if (!findbook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      return res.json(findbook);
    }
  
    if (req.method === 'POST' && req.url === '/api/books') {
      // Add a new book (POST /api/books)
      const { book, author } = req.body;
      if (!book || !author) {
        return res.status(400).json({ message: 'Book title and author are required.' });
      }
      const newId = Math.max(...todo.data.map(item => item.id)) + 1;
      const newbook = { id: newId, book, author };
      todo.data.push(newbook);
      return res.status(201).json(newbook);
    }
  
    if (req.method === 'PUT' && req.url.includes('/api/books/update')) {
      // Update a book by id (PUT /api/books/update/:id)
      const { book, author } = req.body;
      const findId = todo.data.find(item => item.id === parseInt(req.query.id));
      if (!findId) {
        return res.status(404).json({ message: 'Book not found' });
      }
      if (!book || !author) {
        return res.status(400).json({ message: 'Book title and author are required.' });
      }
      findId.book = book;
      findId.author = author;
      return res.json(todo.data);
    }
  
    if (req.method === 'DELETE' && req.url.includes('/api/books/delete')) {
      // Delete a book by id (DELETE /api/books/delete/:id)
      const findId = todo.data.findIndex(item => item.id === parseInt(req.query.id));
      if (findId === -1) {
        return res.status(404).json({ message: 'Book not found' });
      }
      todo.data.splice(findId, 1);
      return res.status(200).json({ message: 'Book deleted successfully', books: todo.data });
    }
  
    res.status(404).json({ message: 'Route not found' });
  }
  