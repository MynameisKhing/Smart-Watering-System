import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './create.css';

export default function Create() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirm) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
    if (password !== confirm) {
      alert('รหัสผ่านไม่ตรงกัน');
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: email.split('@')[0],
          email,
          password
        })
      });

      if (response.ok) {
        alert("ลงทะเบียนสำเร็จ");
        navigate("/login");
      } else {
        const result = await response.json();
        alert(result.detail || "เกิดข้อผิดพลาดในการลงทะเบียน");
      }
    } catch (error) {
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="create-page">
      <div className="create-container">
        <h1 className="create-title">สร้างบัญชี</h1>
        <p className="create-subtitle">กรุณากรอกข้อมูลเพื่อลงทะเบียน</p>

        <form className="create-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="อีเมล"
            className="create-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            className="create-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            className="create-input"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />

          <button type="submit" className="create-button">
            ลงทะเบียน
          </button>
        </form>

        <div className="create-footer">
          <span>มีบัญชีอยู่แล้ว?</span>
          <Link to="/login" className="create-link">เข้าสู่ระบบ</Link>
        </div>
      </div>
    </div>
  );
}
