import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

export default function MainLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      {/* Background Efek Cyberpunk / Arcade */}
      <div className="arcade-bg">
        <div className="bg-grid" />
        <div className="bg-scanlines" />
        <div className="glow-primary animate-pulse-glow" />
        <div className="glow-secondary animate-pulse-glow" />
      </div>

      {/* Navbar Premium */}
      <Navbar />

      {/* Main Page Content */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>

      {/* Footer Premium Cyberpunk */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  );
}