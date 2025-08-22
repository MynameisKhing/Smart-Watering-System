import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style/Login.css';

export default function Login({ onLogin }: { onLogin?: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        onLogin?.();
        navigate("/monitoring");
      } else {
        const { detail } = await res.json();
        alert(detail || "เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch {
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">ยินดีต้อนรับ</h1>
        <p className="login-subtitle">กรุณากรอกชื่อผู้ใช้และรหัสผ่านเพื่อเข้าสู่ระบบ</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ชื่อผู้ใช้"
            className="login-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
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
          <span>ยังไม่มีบัญชี?</span>
          <Link to="/create" className="login-link">สร้างบัญชี</Link>
        </div>
      </div>
    </div>
  );
}
