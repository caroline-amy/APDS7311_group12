// Auth Controller (authController.js)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Register User
const registerUser = async (req, res) => {
  const { name, idNumber, accountNumber, password } = req.body;

  try {
    // Check if account number already exists
    const existingUser = await User.findOne({ accountNumber });
    if (existingUser) {
      return res.status(400).json({ error: 'Account number already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user in DB
    const newUser = new User({
      name,
      idNumber,
      accountNumber,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { accountNumber, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ accountNumber });
    if (!user) return res.status(400).json({ error: 'Invalid account number or password' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid account number or password' });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { registerUser, loginUser };
