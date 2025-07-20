import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import BoardManagement from './pages/BoardManagement';
import Monitoring from './pages/Monitoring';
import Login from './pages/Login';
import Create from './pages/Create';

const ProtectedRoute = ({
  children,
  isAuthenticated,
  onLogout,
}: {
  children: React.ReactElement;
  isAuthenticated: boolean;
  onLogout: () => void;
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout onLogout={onLogout}>{children}</Layout>;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/create" element={<Create />} />
        <Route
          path="/monitoring"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} onLogout={handleLogout}>
              <Monitoring />
            </ProtectedRoute>
          }
        />
        <Route
          path="/board-management"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} onLogout={handleLogout}>
              <BoardManagement />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;