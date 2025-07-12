import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert('กรุณากรอก Username และ Password ให้ครบ');
      return;
    }

    // ตรวจสอบ username/password จริงๆ ที่นี่ได้
    const isValid = true;

    if (isValid) {
      navigate('/monitoring');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
