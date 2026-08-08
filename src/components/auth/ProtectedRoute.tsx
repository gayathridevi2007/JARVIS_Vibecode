import type { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { readStoredUser } from '../../services/auth';

type ProtectedRouteProps = {
  requireAuth: boolean;
  children?: ReactNode;
};

function ProtectedRoute({ requireAuth, children }: ProtectedRouteProps) {
  const location = useLocation();
  const user = readStoredUser();

  if (requireAuth && !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!requireAuth && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute;
