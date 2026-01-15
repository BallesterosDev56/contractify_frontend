/**
 * Componente Features Section del Landing Page
 *
 * @description Sección que muestra las características principales de la plataforma
 */

export const LandingFeatures = () => {
  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mx-auto mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 dark:text-white">
            Autonomía Legal Completa
          </h2>
          <p className="text-slate-600 text-lg dark:text-slate-400">
            Reemplaza tus herramientas fragmentadas con un único sistema operativo cohesivo.
          </p>
        </div>
        <div className="md:grid-cols-6 grid grid-cols-1 gap-6 auto-rows-[300px]">
          {/* Generative Drafting - Large Card */}
          <div className="md:col-span-4 rounded-3xl bg-white dark:bg-slate-900 shadow-sm group relative border border-slate-200 dark:border-slate-800 p-8 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="w-64 h-64 bg-blue-500/5 rounded-full absolute top-0 right-0 blur-3xl group-hover:bg-blue-500/10 transition-colors" />
            <div className="h-full justify-between relative z-10 flex flex-col">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 items-center justify-center text-blue-600 mb-6 flex dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 dark:text-white">Redacción Generativa</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                  Describe tu intención, y nuestra IA construye cláusulas legalmente sólidas al instante, haciendo
                  referencia a tu playbook específico.
                </p>
              </div>
              <div className="mt-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-100 dark:border-slate-700/50 backdrop-blur-sm translate-y-4 group-hover:translate-y-2 transition-transform">
                <div className="mb-2 flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-600" />
                  <div className="h-2 w-16 rounded-full bg-slate-200 dark:bg-slate-600" />
                </div>
                <div className="h-2 w-full rounded-full bg-blue-100 dark:bg-blue-900/20 mb-1.5" />
                <div className="h-2 w-3/4 rounded-full bg-blue-100 dark:bg-blue-900/20" />
              </div>
            </div>
          </div>

          {/* Instant Validation - Dark Card */}
          <div className="md:col-span-2 rounded-3xl bg-slate-900 dark:bg-white shadow-sm group border border-slate-800 dark:border-slate-200 p-8 overflow-hidden hover:shadow-2xl transition-all duration-300 relative">
            <div className="h-full justify-between text-white relative z-10 flex flex-col dark:text-slate-900">
              <div>
                <h3 className="text-2xl font-bold mb-2">Validación Instantánea</h3>
                <p className="text-slate-400 text-sm dark:text-slate-600">Puntuación de riesgo en tiempo real.</p>
              </div>
              <div className="items-center justify-center py-8 flex">
                <div className="h-24 w-24 relative">
                  <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 36 36">
                    <path
                      className="text-slate-700 dark:text-slate-200"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      strokeDasharray="85, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  </svg>
                  <div className="items-center justify-center absolute inset-0 flex flex-col">
                    <span className="text-2xl font-bold">98%</span>
                    <span className="text-[10px] tracking-wider text-slate-400 uppercase">Seguro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Guard - Small Card */}
          <div className="md:col-span-2 md:row-span-1 rounded-3xl bg-white dark:bg-slate-900 shadow-sm group border border-slate-200 dark:border-slate-800 p-8 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 items-center justify-center text-purple-600 mb-6 flex dark:text-purple-400 group-hover:rotate-12 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 dark:text-white">Guardia de Cumplimiento</h3>
            <p className="text-slate-600 text-sm dark:text-slate-400">
              Auto-corrección de términos riesgosos basada en leyes de jurisdicción actualizadas.
            </p>
          </div>

          {/* Smart Workflows - Wide Card */}
          <div className="md:col-span-4 rounded-3xl bg-gradient-to-br shadow-sm items-center justify-between group from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 p-8 overflow-hidden hover:shadow-2xl transition-all duration-300 flex">
            <div className="max-w-xs">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 items-center justify-center text-emerald-600 mb-6 flex dark:text-emerald-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 dark:text-white">Flujos de Trabajo Inteligentes</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Activa pagos, actualiza CRMs y notifica a las partes interesadas en el momento en que se firma el
                contrato.
              </p>
            </div>
            <div className="md:flex items-center hidden gap-2 opacity-80">
              <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-3 border border-slate-100 dark:border-slate-600">
                <div className="w-4 h-4 bg-blue-500 rounded-full" />
              </div>
              <div className="w-8 h-0.5 bg-slate-300 dark:bg-slate-600" />
              <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-3 border border-slate-100 dark:border-slate-600">
                <div className="w-4 h-4 bg-purple-500 rounded-full" />
              </div>
              <div className="w-8 h-0.5 bg-slate-300 dark:bg-slate-600" />
              <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-3 border border-slate-100 dark:border-slate-600">
                <div className="w-4 h-4 bg-emerald-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
