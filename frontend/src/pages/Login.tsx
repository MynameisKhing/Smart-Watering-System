import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ตรวจสอบ username/password ตรงนี้ (mock ตัวอย่าง)
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
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
