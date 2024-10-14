// App Component (App.js)
import React from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PaymentForm from './components/PaymentForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Customer International Payments Portal</h1>
      <div className="form-container">
        <RegisterForm />
        <LoginForm />
        <PaymentForm />
      </div>
    </div>
  );
}

export default App;