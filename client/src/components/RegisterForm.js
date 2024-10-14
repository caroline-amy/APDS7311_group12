// RegisterForm Component (RegisterForm.js)
import React, { useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    accountNumber: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize user input
    const sanitizedData = {
      name: DOMPurify.sanitize(formData.name),
      idNumber: DOMPurify.sanitize(formData.idNumber),
      accountNumber: DOMPurify.sanitize(formData.accountNumber),
      password: DOMPurify.sanitize(formData.password),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/register', sanitizedData);
      console.log('Registration successful:', response.data);
      setError(null); // Clear any previous errors on success
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response && error.response.status === 400) {
        setError('Account number already exists or invalid data provided');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="register-input" />
        </label>
        <label>
          ID Number:
          <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} required className="register-input" />
        </label>
        <label>
          Account Number:
          <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required className="register-input" />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required className="register-input" />
        </label>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;