/**
 * Componente ProtectRoute
 *
 * @description Protege rutas que requieren autenticación
 * - Verifica el estado de autenticación con Firebase
 * - Redirige a login si no está autenticado
 * - Muestra spinner mientras verifica el estado
 */

import type { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/utils/useAuth';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ROUTES } from '@/constants/app.constants';

export interface ProtectRouteProps {
  children: ReactNode;
}

export const ProtectRoute: FC<ProtectRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Mostrar spinner mientras se verifica el estado de autenticación
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Redirigir a login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
};
