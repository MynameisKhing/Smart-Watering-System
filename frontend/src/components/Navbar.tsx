import { Link } from 'react-router-dom';
import './Navbar.css';
import { useState, useEffect } from 'react';

export default function Navbar({ onLogout }: { onLogout?: () => void }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    if (onLogout) onLogout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-custom">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white" to="/monitoring">
          RakTonmai
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 navbar-center">
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/monitoring">
                แสดงข้อมูลการรดน้ำ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/board-management">
                จัดการบอร์ดในระบบ
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item">
              <span className="navbar-time text-white fw-bold me-3">
                {currentTime.toLocaleTimeString('th-TH', { timeZone: 'Asia/Bangkok' })}
              </span>
            </li>
            <li className="nav-item">
              <button className="nav-link fw-bold btn-logout" onClick={handleLogout}>
                ออกจากระบบ
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}