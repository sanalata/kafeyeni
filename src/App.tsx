import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import { Coffee } from 'lucide-react';

function ProtectedRoute({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) {
  const { user } = useStore();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/menu" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F5EBE0]">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/menu"
              element={
                <ProtectedRoute>
                  <Menu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/siparislerim"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <footer className="bg-[#2C1810] text-white py-6">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coffee className="h-6 w-6" />
              <span className="font-semibold">Türk Kahvesi</span>
            </div>
            <p className="text-sm">© 2024 Tüm hakları saklıdır.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;