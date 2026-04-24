import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Settings, Sparkles, Zap } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, checkAuth, hasInitialized } = useAuthStore();

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'About', path: '/about', icon: '👨‍💻' },
    { name: 'Projects', path: '/projects', icon: '🚀' },
    { name: 'DSA/CP', path: '/dsa', icon: '🧠' },
    { name: 'Blog', path: '/blog', icon: '📝' },
    { name: 'Contact', path: '/contact', icon: '💬' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only check auth if we're on admin routes - don't check for public routes
  useEffect(() => {
    // Only check auth status if we're on admin routes or if user is trying to access admin
    if (location.pathname.startsWith('/admin') && !hasInitialized) {
      checkAuth();
    }
  }, [checkAuth, hasInitialized, location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Floating Navigation */}
      <nav className={`nav-floating transition-all duration-500 ${
        scrolled 
          ? 'bg-rich-black/95 backdrop-blur-xl shadow-glow border-yale-blue/50' 
          : 'bg-rich-black/80 backdrop-blur-lg border-yale-blue/30'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo with Animated Icon */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <Sparkles className="w-8 h-8 text-mikado-yellow group-hover:text-gold transition-colors duration-300 animate-pulse" />
              <div className="absolute inset-0 bg-mikado-yellow/20 rounded-full blur-lg group-hover:bg-gold/20 transition-colors duration-300"></div>
            </div>
            <span className="text-2xl font-display font-bold gradient-text hover:scale-105 transition-transform duration-300">
              Portfolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link group flex items-center space-x-2 ${
                  isActive(item.path) ? 'active text-white bg-oxford-blue/50' : ''
                }`}
              >
                <span className="text-lg group-hover:animate-bounce">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
            
            {/* Admin Button - Only show if authenticated */}
            {isAuthenticated && (
              <Link
                to="/admin"
                className={`relative overflow-hidden inline-flex items-center px-4 py-2 rounded-full font-medium transition-all duration-500 group ${
                  location.pathname.startsWith('/admin')
                    ? 'bg-gradient-to-r from-gold to-mikado-yellow text-rich-black shadow-neon'
                    : 'bg-gradient-to-r from-oxford-blue/50 to-rich-black/70 text-mikado-yellow border border-yale-blue/40 hover:border-mikado-yellow hover:shadow-glow'
                }`}
              >
                <Settings size={16} className="mr-2 group-hover:animate-spin" />
                <span>Admin</span>
                <Zap size={14} className="ml-1 opacity-60 group-hover:opacity-100 transition-opacity" />
                
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mikado-yellow/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-oxford-blue/50 border border-yale-blue/40 hover:border-mikado-yellow transition-all duration-300 group"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className="text-mikado-yellow group-hover:text-white transition-colors" />
              ) : (
                <Menu size={24} className="text-mikado-yellow group-hover:text-white transition-colors" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-rich-black/98 backdrop-blur-xl">
          <div className="flex flex-col items-center justify-center min-h-screen space-y-8 p-8">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-4 text-2xl font-medium transition-all duration-500 hover:scale-110 group ${
                  isActive(item.path)
                    ? 'text-white'
                    : 'text-mikado-yellow hover:text-white'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-3xl group-hover:animate-bounce">{item.icon}</span>
                <span className="gradient-text">{item.name}</span>
              </Link>
            ))}
            
            {/* Mobile Admin Button - Only show if authenticated */}
            {isAuthenticated && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-4 text-2xl font-medium text-gold hover:text-mikado-yellow transition-colors duration-300 group"
              >
                <Settings size={28} className="group-hover:animate-spin" />
                <span className="gradient-text-warm">Admin Dashboard</span>
              </Link>
            )}
          </div>
          
          {/* Animated particles in mobile menu */}
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
        </div>
      )}
    </>
  );
};

export default Navbar;
