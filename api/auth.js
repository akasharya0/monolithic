import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let users = [];  // Temporary user store (use database in production)

export default async function handler(req, res) {
  if (req.method === 'POST' && req.url.includes('/register')) {
    // Register Route (POST /api/auth/register)
    const { username, password } = req.body;

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    return res.status(201).json({ message: 'User registered successfully' });
  }

  if (req.method === 'POST' && req.url.includes('/login')) {
    // Login Route (POST /api/auth/login)
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return res.status(200).json({ token });
  }

  if (req.method === 'GET' && req.url.includes('/protected')) {
    // Protected Route (GET /api/auth/protected)
    return authenticateToken(req, res);
  }

  res.status(404).json({ message: 'Route not found' });
}

function authenticateToken(req, res) {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    req.user = user;
    res.status(200).json({ message: 'You have access to this protected route!' });
  });
}
