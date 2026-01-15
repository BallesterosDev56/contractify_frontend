/**
 * Componente Comparison Section del Landing Page
 *
 * @description Sección que compara el método antiguo vs Contractify
 */

export const LandingComparison = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
      <div className="mx-auto px-6 max-w-7xl">
        <div className="md:grid-cols-2 lg:gap-24 grid gap-12">
          {/* Old Way */}
          <div className="opacity-70 grayscale transition-all hover:grayscale-0 hover:opacity-100">
            <h3 className="text-2xl font-bold text-slate-400 mb-8 items-center dark:text-slate-500 flex gap-3">
              <span className="line-through decoration-red-500/50 decoration-4">El Método Antiguo</span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">Lento</span>
            </h3>
            <ul className="space-y-6">
              <li className="items-start flex gap-4">
                <div className="mt-1 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/20 text-red-500 items-center justify-center flex-shrink-0 flex">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">Cadenas de Email Interminables</p>
                  <p className="text-slate-500 text-sm mt-1">Pesadillas de control de versiones y archivos adjuntos perdidos.</p>
                </div>
              </li>
              <li className="items-start flex gap-4">
                <div className="mt-1 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/20 text-red-500 items-center justify-center flex-shrink-0 flex">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">Asesoría Legal Costosa</p>
                  <p className="text-slate-500 text-sm mt-1">Quemando presupuesto en revisiones rutinarias de NDAs.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contractify Way */}
          <div className="relative">
            <div className="w-px bg-gradient-to-b md:block absolute -left-6 top-0 bottom-0 from-transparent via-blue-200 dark:via-blue-800 to-transparent hidden" />
            <h3 className="text-2xl font-bold text-blue-600 mb-8 items-center dark:text-blue-400 flex gap-3">
              Contractify
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 rounded dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Rápido
              </span>
            </h3>
            <ul className="space-y-6">
              <li className="items-start flex gap-4">
                <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-500 items-center justify-center shadow-sm shadow-emerald-200 flex-shrink-0 flex dark:shadow-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Verdad Centralizada</p>
                  <p className="text-slate-600 text-sm mt-1 dark:text-slate-400">
                    Un documento en vivo. Colaboración en tiempo real.
                  </p>
                </div>
              </li>
              <li className="items-start flex gap-4">
                <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-500 items-center justify-center shadow-sm shadow-emerald-200 flex-shrink-0 flex dark:shadow-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Seguridad Potenciada por IA</p>
                  <p className="text-slate-600 text-sm mt-1 dark:text-slate-400">
                    Barreras de protección que previenen términos riesgosos automáticamente.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
