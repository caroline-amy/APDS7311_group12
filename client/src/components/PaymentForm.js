// PaymentForm Component (PaymentForm.js)
import React, { useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import './PaymentForm.css';

const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    currency: 'USD',
    provider: 'SWIFT',
    recipientAccount: '',
    swiftCode: '',
  });

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize user input
    const sanitizedData = {
      amount: DOMPurify.sanitize(paymentData.amount),
      currency: DOMPurify.sanitize(paymentData.currency),
      provider: DOMPurify.sanitize(paymentData.provider),
      recipientAccount: DOMPurify.sanitize(paymentData.recipientAccount),
      swiftCode: DOMPurify.sanitize(paymentData.swiftCode),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/payment', sanitizedData);
      console.log('Payment successful:', response.data);
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  return (
    <div className="payment-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <h2>Make a Payment</h2>
        <label>
          Amount:
          <input type="number" name="amount" value={paymentData.amount} onChange={handleChange} required className="payment-input" />
        </label>
        <label>
          Currency:
          <select name="currency" value={paymentData.currency} onChange={handleChange} className="payment-input">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="ZAR">ZAR</option>
          </select>
        </label>
        <label>
          Provider:
          <select name="provider" value={paymentData.provider} onChange={handleChange} className="payment-input">
            <option value="SWIFT">SWIFT</option>
          </select>
        </label>
        <label>
          Recipient Account:
          <input type="text" name="recipientAccount" value={paymentData.recipientAccount} onChange={handleChange} required className="payment-input" />
        </label>
        <label>
          SWIFT Code:
          <input type="text" name="swiftCode" value={paymentData.swiftCode} onChange={handleChange} required className="payment-input" />
        </label>
        <button type="submit" className="payment-button">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentForm;