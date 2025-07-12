import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Monitoring from './pages/Monitoring';
import Schedule from './pages/Schedule';
import Layout from './components/Layout';
import Design from './pages/Design';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/monitoring"
          element={
            <Layout>
              <Monitoring />
            </Layout>
          }
        />
        <Route
          path="/schedule"
          element={
            <Layout>
              <Schedule />
            </Layout>
          }
        />
        <Route
          path="/design"
          element={
            <Layout>
              <Design />
            </Layout>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}
