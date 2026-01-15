/**
 * Componente CTA Section del Landing Page
 *
 * @description Sección de llamada a la acción final
 */

import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/app.constants';

export const LandingCTA = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="bg-blue-900 dark:bg-black absolute inset-0" />
      <div
        className="absolute inset-0 opacity-20 brightness-100 contrast-150"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />
      <div className="w-[600px] h-[600px] bg-indigo-600/30 rounded-full absolute top-0 right-0 blur-[128px]" />
      <div className="w-[600px] h-[600px] bg-blue-600/20 rounded-full absolute bottom-0 left-0 blur-[128px]" />
      <div className="mx-auto text-center relative max-w-4xl z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-8">
          ¿Listo para asegurar tu futuro?
        </h2>
        <p className="text-xl text-blue-100 mb-12 mx-auto max-w-2xl">
          Únete a más de 500 equipos legales usando Contractify para cerrar acuerdos 10x más rápido con confianza total
          en el cumplimiento.
        </p>
        <div className="sm:flex-row items-center justify-center flex flex-col gap-4">
          <Link
            to={ROUTES.REGISTER}
            className="hover:bg-emerald-400 transition-all transform hover:-translate-y-1 w-full sm:w-auto px-10 py-4 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/50 text-lg"
          >
            Empezar Ahora
          </Link>
          <button
            type="button"
            className="border border-blue-400 hover:bg-blue-800/50 transition-colors w-full sm:w-auto px-10 py-4 bg-transparent text-white font-semibold rounded-xl"
          >
            Hablar con Ventas
          </button>
        </div>
        <p className="mt-8 text-sm text-blue-200/60">No se requiere tarjeta de crédito para la prueba de 14 días.</p>
      </div>
    </section>
  );
};
