import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import BoardManagement from './pages/BoardManagement';
import Monitoring from './pages/Monitoring';
import Login from './pages/Login';
import Create from './pages/Create';

type AuthComponentProps = {
  onLogin?: () => void;
};

const ProtectedRoute = ({ children }: { children: React.ReactElement<AuthComponentProps> }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogin = () => {
    console.log('handleLogin called, setting isAuthenticated to true');
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    console.log('handleLogout called, setting isAuthenticated to false');
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
  };

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout onLogout={handleLogout}>
      {React.cloneElement(children, { onLogin: handleLogin })}
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route
          path="/monitoring"
          element={
            <ProtectedRoute>
              <Monitoring />
            </ProtectedRoute>
          }
        />
        <Route
          path="/board-management"
          element={
            <ProtectedRoute>
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