/**
 * Vista Landing Page
 *
 * @description Página de inicio pública
 * TODO: Implementar diseño completo con hero section
 * TODO: Agregar secciones de características
 * TODO: Agregar call-to-action
 */

import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/app.constants';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Genera y firma contratos legales válidos en minutos
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sin abogado, sin riesgo. La plataforma que necesitas para gestionar tus contratos de forma rápida y segura.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ROUTES.REGISTER}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Empezar gratis
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>

      {/* TODO: Agregar secciones de características, testimonios, etc. */}
    </div>
  );
};
