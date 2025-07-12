import type { ReactNode } from 'react';
import Navbar from './Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="container">
        {children}
      </main>
    </div>
  );
}
