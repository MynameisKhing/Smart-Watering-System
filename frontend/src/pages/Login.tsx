import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export interface LoginProps {
  onLogin?: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('กรุณากรอก อีเมล และ รหัสผ่าน');
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        if (onLogin) onLogin();
        navigate("/monitoring");
      } else {
        const result = await response.json();
        alert(result.detail || "เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch (error) {
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">ยินดีต้อนรับ</h1>
        <p className="login-subtitle">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="อีเมล"
            className="login-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            className="login-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            เข้าสู่ระบบ
          </button>
        </form>

        <div className="login-footer">
          <span>ไม่มีบัญชี?</span>
          <Link to="/create" className="login-link">สร้างบัญชี</Link>
        </div>
      </div>
    </div>
  );
}
