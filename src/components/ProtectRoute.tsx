/**
 * Componente ProtectRoute
 *
 * @description Protege rutas que requieren autenticación
 * TODO: Implementar redirección a login si no está autenticado
 * TODO: Implementar verificación de permisos específicos
 */

import type { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/utils/useAuth';
import { ROUTES } from '@/constants/app.constants';

export interface ProtectRouteProps {
  children: ReactNode;
}

export const ProtectRoute: FC<ProtectRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // TODO: Implementar verificación de token válido
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
};
