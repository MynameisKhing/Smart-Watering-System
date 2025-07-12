import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './create.css';

export default function Create() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
    if (password !== confirm) {
      alert('รหัสผ่านไม่ตรงกัน');
      return;
    }
    navigate('/login');
  };

  return (
    <div className="create-page">
      <div className="create-container">
        <h1 className="create-title">Create Account</h1>
        <p className="create-subtitle">Fill in your details to sign up</p>

        <form className="create-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="create-input"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="create-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="create-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="create-input"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />

          <button type="submit" className="create-button">
            Sign Up
          </button>
        </form>

        <div className="create-footer">
          <span>Already have an account?</span>
          <Link to="/login" className="create-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
