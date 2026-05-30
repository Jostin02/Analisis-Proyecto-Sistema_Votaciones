import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export function AuthLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    } else if (isLoggedIn && location.pathname === '/login') {
      navigate('/dashboard', { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return <Outlet />;
}
