import { Link } from 'react-router-dom';
import './Navbar.css'; // optional, เผื่อจัด layout ด้วย CSS

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar__content">
        <div className="navbar__left">
          <Link to="/monitoring">Monitoring</Link>
          {' | '}
          <Link to="/schedule">Schedule</Link>
          {' | '}
          <Link to="/design">Design</Link>
        </div>
        <div className="navbar__right">
          <Link to="/">Login</Link>
        </div>
      </nav>
    </header>
  );
}
