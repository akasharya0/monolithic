import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let users = [];

export default async function handler(req, res) {
  if (req.method === 'POST' && req.url.includes('/register')) {
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

  res.status(404).json({ message: 'Route not found' });
}
