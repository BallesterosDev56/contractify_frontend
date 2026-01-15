/**
 * Componente Footer del Landing Page
 *
 * @description Pie de página con enlaces y información
 */

export const LandingFooter = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 pt-20 pb-10 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto px-6 md:grid-cols-4 mb-16 max-w-7xl grid grid-cols-2 gap-10">
        {/* Brand */}
        <div className="md:col-span-1 col-span-2">
          <div className="items-center mb-6 flex gap-2">
            <div className="w-6 h-6 bg-slate-900 dark:bg-white items-center justify-center text-white font-bold text-xs rounded flex dark:text-slate-900">
              C
            </div>
            <span className="font-bold text-slate-900 dark:text-white">Contractify</span>
          </div>
          <p className="text-slate-500 text-sm mb-4">
            El sistema operativo para equipos legales modernos. Automatizado, seguro y rápido.
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Product */}
        <div>
          <p className="font-bold text-slate-900 mb-4 dark:text-white">Producto</p>
          <ul className="text-sm text-slate-500 space-y-2 dark:text-slate-400">
            <li>
              <a href="#features" className="hover:text-blue-600 cursor-pointer">
                Características
              </a>
            </li>
            <li>
              <a href="#platform" className="hover:text-blue-600 cursor-pointer">
                Integraciones
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-blue-600 cursor-pointer">
                Precios
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 cursor-pointer">
                Changelog
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="font-bold text-slate-900 mb-4 dark:text-white">Empresa</p>
          <ul className="text-sm text-slate-500 space-y-2 dark:text-slate-400">
            <li>
              <a href="#" className="hover:text-blue-600 cursor-pointer">
                Acerca de
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 cursor-pointer">
                Carreras
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 cursor-pointer">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 cursor-pointer">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <p className="font-bold text-slate-900 mb-4 dark:text-white">Legal</p>
          <ul className="text-sm text-slate-500 space-y-2 dark:text-slate-400">
            <li>
              <a href="#" className="hover:text-blue-600 cursor-pointer">
                Política de Privacidad
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 cursor-pointer">
                Términos de Servicio
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 cursor-pointer">
                Seguridad
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto px-6 text-center pt-8 max-w-7xl border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-400">© 2024 Contractify. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
