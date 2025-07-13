import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Create from './pages/Create';
import Monitoring from './pages/Monitoring';
import Schedule from './pages/Schedule';
import BoardManagement from './pages/BoardManagement';
import Layout from './components/Layout';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/monitoring" element={<Layout><Monitoring /></Layout>} />
        <Route path="/schedule" element={<Layout><Schedule /></Layout>} />
        <Route path="/board-management" element={<Layout><BoardManagement /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
