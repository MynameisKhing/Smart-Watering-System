import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Create from './pages/Create';
import Monitoring from './pages/Monitoring';
import Schedule from './pages/Schedule';
import Design from './pages/Design';
import Layout from './components/Layout';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ทั้ง / และ /login ชี้ไปหน้า Welcome/Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/monitoring" element={<Layout><Monitoring /></Layout>} />
        <Route path="/schedule" element={<Layout><Schedule /></Layout>} />
        <Route path="/design" element={<Layout><Design /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
