// Auth Routes (authRoutes.js)
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const Payment = require('../models/paymentModel');


// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Payment route (authRoutes.js)
router.post('/payment', async (req, res) => {
  const { amount, currency, provider, recipientAccount, swiftCode } = req.body;

  // Validate and sanitize inputs here if needed

  try {
    // Save payment to the database
    const newPayment = new Payment({
      amount,
      currency,
      provider,
      recipientAccount,
      swiftCode,
      status: 'Pending'
    });

    await newPayment.save();

    res.status(201).json({ message: 'Payment processed successfully' });
  } catch (error) {
    console.error('Error during payment:', error);
    res.status(500).json({ error: 'Failed to process payment' });
  }
});


module.exports = router;