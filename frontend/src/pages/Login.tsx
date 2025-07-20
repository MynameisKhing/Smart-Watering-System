import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

// Define props interface for Login component
interface LoginProps {
  onLogin?: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('กรุณากรอก Email และ Password');
      return;
    }
    if (email === 'user@example.com' && password === 'password123') {
      console.log('Login successful, calling onLogin if available');
      if (onLogin) onLogin();
      navigate('/monitoring');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Welcome</h1>
        <p className="login-subtitle">Sign in to your account</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <span>Don't have an account?</span>
          <Link to="/create" className="login-link">Create Account</Link>
        </div>
      </div>
    </div>
  );
}