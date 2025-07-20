import type { ReactNode } from 'react';
import Navbar from './Navbar';

export default function Layout({ children, onLogout }: { children: ReactNode; onLogout?: () => void }) {
  return (
    <div>
      <Navbar onLogout={onLogout} />
      <main className="container mt-4">
        {children}
      </main>
    </div>
  );
}