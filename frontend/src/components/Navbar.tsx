import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: '#28a745' }} // เขียวสด
    >
      <div className="container">
        <Link className="navbar-brand text-white fw-bold" to="/monitoring">
          Smart Watering
        </Link>
        <div>
          <Link
            className="nav-link d-inline text-white me-3"
            to="/monitoring"
          >
            Monitoring
          </Link>
          <Link
            className="nav-link d-inline text-white me-3"
            to="/schedule"
          >
            Schedule
          </Link>
          <Link
            className="nav-link d-inline text-white me-3"
            to="/design"
          >
            Design
          </Link>
          <Link
            className="nav-link d-inline text-white"
            to="/"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
