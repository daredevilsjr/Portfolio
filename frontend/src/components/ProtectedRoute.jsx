import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import LoadingSpinner from './UI/LoadingSpinner';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, checkAuth, setRedirectPath } = useAuthStore();
  const [hasChecked, setHasChecked] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      if (!hasChecked) {
        setIsInitializing(true);
        await checkAuth();
        setHasChecked(true);
        setIsInitializing(false);
      }
    };

    verifyAuth();
  }, [hasChecked, checkAuth]);

  useEffect(() => {
    // Store the current path for redirect after login
    if (hasChecked && !isAuthenticated) {
      setRedirectPath(location.pathname);
    }
  }, [isAuthenticated, hasChecked, location.pathname, setRedirectPath]);

  // Show loading while initializing or checking auth
  if (isInitializing || isLoading || !hasChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Verifying authentication...
          </p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
