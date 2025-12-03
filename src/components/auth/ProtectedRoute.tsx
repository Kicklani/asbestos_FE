import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: 'USER' | 'ADMIN' | 'EXPERT';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requiredRole,
}) => {
  const { isAuthenticated, user } = useAuthStore();

  // 인증 필요한데 로그인 안됨
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 특정 역할 필요한데 권한 없음
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
