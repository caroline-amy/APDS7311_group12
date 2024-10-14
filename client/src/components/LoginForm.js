// LoginForm Component (LoginForm.js)
import React, { useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import './LoginForm.css';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    accountNumber: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize user input
    const sanitizedData = {
      accountNumber: DOMPurify.sanitize(loginData.accountNumber),
      password: DOMPurify.sanitize(loginData.password),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/login', sanitizedData);
      console.log('Login successful:', response.data);
      setError(null); // Clear any previous errors on success
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.status === 400) {
        setError('Invalid account number or password');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <label>
          Account Number:
          <input type="text" name="accountNumber" value={loginData.accountNumber} onChange={handleChange} required className="login-input" />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={loginData.password} onChange={handleChange} required className="login-input" />
        </label>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;