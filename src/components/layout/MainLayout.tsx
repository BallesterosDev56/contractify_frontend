/**
 * Layout principal para páginas privadas
 *
 * @description Layout con sidebar y header para el dashboard
 * TODO: Implementar sidebar completo con navegación
 * TODO: Implementar header con usuario y acciones
 * TODO: Implementar breadcrumbs
 */

import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/utils/useAuth';
import { ROUTES } from '@/constants/app.constants';
import { Button } from '@/components/ui/Button';

export interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-blue-600">Contractify</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <Link
              to={ROUTES.DASHBOARD}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Dashboard
            </Link>
            <Link
              to={ROUTES.CONTRACTS}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Contratos
            </Link>
            <Link
              to={ROUTES.SETTINGS}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Configuración
            </Link>
          </nav>

          {/* User info */}
          <div className="p-4 border-t">
            <p className="text-sm text-gray-600">{user?.email}</p>
            <Button variant="ghost" size="sm" onClick={logout} className="mt-2 w-full">
              Cerrar sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-600"
            >
              ☰
            </button>
            <div className="flex items-center space-x-4">
              {/* TODO: Agregar notificaciones, búsqueda, etc. */}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children || <Outlet />}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
