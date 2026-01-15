/**
 * Componente Navbar del Landing Page
 *
 * @description Barra de navegación principal con logo y acciones
 */

import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/app.constants';

export const LandingNavbar = () => {
  return (
    <nav className="px-4 py-4 md:py-6 fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-5xl">
        <div className="bg-white/70 dark:bg-slate-900/70 rounded-full px-6 py-3 items-center justify-between shadow-lg shadow-slate-200/20 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 flex dark:shadow-slate-900/40 transition-all duration-300 hover:shadow-xl">
          <div className="items-center flex gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white items-center justify-center text-white font-bold text-lg flex dark:text-slate-900">
              C
            </div>
            <span className="font-bold tracking-tight text-lg text-slate-900 dark:text-white">
              Contractify
            </span>
          </div>
          <div className="md:flex items-center text-sm font-medium text-slate-600 hidden gap-8 dark:text-slate-400">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Soluciones
            </a>
            <a href="#platform" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Plataforma
            </a>
            <a href="#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Precios
            </a>
          </div>
          <div className="items-center flex gap-4">
            <Link
              to={ROUTES.LOGIN}
              className="sm:block text-sm font-medium text-slate-900 hidden dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Iniciar sesión
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="hover:bg-slate-800 dark:hover:bg-slate-200 dark:text-slate-900 transition-all hover:shadow-lg transform hover:-translate-y-0.5 bg-slate-900 dark:bg-white text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md"
            >
              Empezar gratis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
