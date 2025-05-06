import { ReactNode, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { isAuthenticated } from '../utils/auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * A wrapper component that ensures routes are only accessible to authenticated users
 * If the user is not authenticated, they are redirected to the login page
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      // Redirect to login page if not authenticated
      navigate({ to: '/admin/login' });
    }
  }, [navigate]);

  // Only render children if authenticated
  return isAuthenticated() ? <>{children}</> : null;
};
