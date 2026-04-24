import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, FolderOpen, Award, BookOpen, MessageSquare, LogOut, Menu, X } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { showToast } from '../utils/toast';
import Button from './UI/Button';

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin', icon: Home },
    { name: 'Profile', path: '/admin/profile', icon: User },
    { name: 'Projects', path: '/admin/projects', icon: FolderOpen },
    { name: 'DSA/CP', path: '/admin/dsa', icon: Award },
    { name: 'Blog', path: '/admin/blog', icon: BookOpen },
    { name: 'Messages', path: '/admin/contacts', icon: MessageSquare },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      showToast.success('Logged out successfully');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      showToast.error('Error logging out');
    }
  };

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-rich-black/95 backdrop-blur-xl shadow-lg border-b border-yale-blue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-xl font-bold text-mikado-yellow hover:text-gold transition-colors"
            >
              Portfolio Admin
            </Link>
            <span className="text-yale-blue">|</span>
            <span className="text-sm text-white/70">
              Welcome, {user?.name || 'Admin'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'bg-mikado-yellow/20 text-mikado-yellow border border-mikado-yellow/30'
                      : 'text-white/80 hover:text-mikado-yellow hover:bg-white/10'
                  }`}
                >
                  <Icon size={16} className="mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Back to Site */}
            <Link
              to="/"
              className="text-sm text-white/70 hover:text-mikado-yellow transition-colors"
            >
              ← Back to Site
            </Link>

            {/* Logout */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white/80 hover:text-mikado-yellow hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-yale-blue/30">
            <div className="py-4 space-y-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'bg-mikado-yellow/20 text-mikado-yellow border-l-4 border-mikado-yellow'
                        : 'text-white/80 hover:text-mikado-yellow hover:bg-white/10'
                    }`}
                  >
                    <Icon size={16} className="mr-3" />
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Mobile Actions */}
              <div className="pt-4 border-t border-yale-blue/30 space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-2 text-sm text-white/70 hover:text-mikado-yellow transition-colors"
                >
                  ← Back to Site
                </Link>
                
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors"
                >
                  <LogOut size={16} className="mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
