/**
 * Layout para páginas de autenticación
 *
 * @description Layout simple para login, registro, etc.
 * TODO: Implementar diseño visual completo
 * TODO: Agregar logo y branding
 */

import type { FC, ReactNode } from 'react';

export interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* TODO: Agregar logo */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Contractify
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
};
