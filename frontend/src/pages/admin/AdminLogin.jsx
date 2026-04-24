import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { showToast } from '../../utils/toast';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const { 
    login, 
    isAuthenticated, 
    isLoading, 
    error, 
    clearError, 
    redirectPath, 
    clearRedirectPath,
    hasInitialized
  } = useAuthStore();
  
  const navigate = useNavigate();

  // Handle redirect after successful authentication
  useEffect(() => {
    if (hasInitialized && isAuthenticated) {
      const targetPath = redirectPath || '/admin';
      clearRedirectPath();
      navigate(targetPath, { replace: true });
    }
  }, [isAuthenticated, hasInitialized, redirectPath, navigate, clearRedirectPath]);

  // Simple redirect check for already authenticated users
  if (hasInitialized && isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await login(formData);
    
    if (result.success) {
      showToast.success('Login successful! Redirecting...');
      // Navigation will be handled by useEffect above
    } else {
      showToast.error(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Admin Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Sign in to access the admin dashboard
            </p>
            {redirectPath && redirectPath !== '/admin' && (
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                You'll be redirected to: {redirectPath}
              </p>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10"
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10 pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button
              type="submit"
              loading={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <strong>Demo Credentials:</strong>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Email: admin@portfolio.com<br />
              Password: admin123456
            </p>
          </div>

          {/* Quick Fill Demo Credentials */}
          <div className="mt-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setFormData({
                  email: 'admin@portfolio.com',
                  password: 'admin123456'
                });
              }}
              className="w-full text-sm"
              disabled={isLoading}
            >
              Fill Demo Credentials
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
