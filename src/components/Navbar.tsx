import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, ShoppingBag, User, Menu as MenuIcon, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, cart, logout } = useStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#2C1810] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Coffee className="h-8 w-8" />
            <span className="font-bold text-xl">Türk Kahvesi</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {user ? (
              <>
                <Link to="/menu" className="hover:text-[#D4A574] transition-colors">
                  Menü
                </Link>
                <Link to="/siparislerim" className="hover:text-[#D4A574] transition-colors">
                  Siparişlerim
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="hover:text-[#D4A574] transition-colors">
                    Yönetici Paneli
                  </Link>
                )}
              </>
            ) : (
              <Link to="/login" className="hover:text-[#D4A574] transition-colors">
                Giriş Yap
              </Link>
            )}
          </div>

          {user && (
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6" />
                <span>{cart.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-6 w-6" />
                <span>{user.credits} Kredi</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 hover:text-[#D4A574] transition-colors"
              >
                <LogOut className="h-6 w-6" />
                <span>Çıkış</span>
              </button>
            </div>
          )}

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4">
            {user ? (
              <>
                <Link
                  to="/menu"
                  className="block py-2 hover:text-[#D4A574] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Menü
                </Link>
                <Link
                  to="/siparislerim"
                  className="block py-2 hover:text-[#D4A574] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Siparişlerim
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="block py-2 hover:text-[#D4A574] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Yönetici Paneli
                  </Link>
                )}
                <div className="flex items-center gap-4 py-2">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-6 w-6" />
                    <span>{cart.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-6 w-6" />
                    <span>{user.credits} Kredi</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-2 hover:text-[#D4A574] transition-colors"
                >
                  <LogOut className="h-6 w-6" />
                  <span>Çıkış</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 hover:text-[#D4A574] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Giriş Yap
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}