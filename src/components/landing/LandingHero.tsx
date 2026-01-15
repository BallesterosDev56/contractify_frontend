import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/app.constants';
import { CheckCircle2, ArrowRight, PenTool } from 'lucide-react'; // Asegúrate de tener lucide-react o usa iconos similares

export const LandingHero = () => {
  const [isSigned, setIsSigned] = useState(false);

  // Simulación de auto-firma para efecto visual
  useEffect(() => {
    const timer = setTimeout(() => setIsSigned(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden bg-slate-50 dark:bg-[#0B0F19]">
      {/* FONDO AMBIENTAL (Glow Effects) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal dark:bg-blue-500/10" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal dark:bg-violet-500/10" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* --- COLUMNA IZQUIERDA: CONTENIDO --- */}
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-6">
              Contratos a la <br />
              <span className="text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text">
                Velocidad de la Luz
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg">
              Automatización legal inteligente. Genera documentos jurídicos blindados, gestiona el ciclo de vida y firma digitalmente en segundos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={ROUTES.REGISTER}
                className="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-white transition-all bg-slate-900 rounded-xl hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98]"
              >
                Crear Contrato Gratis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-slate-700 transition-all bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-900/50 dark:border-slate-800 dark:text-white dark:hover:bg-slate-800">
                Ver Demo
              </button>
            </div>
          </div>

          {/* --- COLUMNA DERECHA: REPRESENTACIÓN VISUAL FABULOSA --- */}
          <div className="relative perspective-1000 lg:h-[600px] flex items-center justify-center">

            {/* Tarjeta Glassmorphism Principal */}
            <div className="relative w-full max-w-md bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-2xl shadow-2xl shadow-indigo-500/10 p-8 transform rotate-y-12 transition-all duration-700 hover:rotate-0 hover:scale-[1.02]">

              {/* Header del Contrato */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">Contrato de Servicios</h3>
                </div>
                <div className="h-8 w-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <PenTool className="w-4 h-4" />
                </div>
              </div>

              {/* Cuerpo Abstracto (Skeleton UI para minimalismo) */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-12 bg-slate-300 dark:bg-slate-600 rounded"></div>
                  <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded"></div>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded"></div>
                <div className="h-2.5 w-3/4 bg-slate-100 dark:bg-slate-800 rounded"></div>

                {/* Variable Highlight (La parte "Innovadora") */}
                <div className="py-2">
                  <div className="flex justify-between items-center p-3 bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-500/20 rounded-lg">
                    <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-300">Valor del Contrato</span>
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 font-mono">$12.500.000 COP</span>
                  </div>
                </div>

                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded"></div>
                <div className="h-2.5 w-5/6 bg-slate-100 dark:bg-slate-800 rounded"></div>
              </div>

              {/* AREA DE FIRMA DIGITAL MEJORADA */}
              <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-700/60">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Firmado Digitalmente por</span>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-500/30">
                        JS
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-none">Juan Sebastián</span>
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5">IP: 192.168.1.X • {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* La Firma Visual */}
                  <div className={`relative px-4 py-2 border-2 border-dashed rounded-lg transition-colors duration-500 ${isSigned ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 border-solid' : 'border-slate-300 dark:border-slate-600'}`}>

                    {!isSigned && (
                       <span className="text-[10px] text-slate-400 font-medium">Esperando firma...</span>
                    )}

                    {/* SVG Firma Animada */}
                    <svg
                      viewBox="0 0 160 60"
                      className={`w-24 h-10 text-emerald-600 dark:text-emerald-400 ${isSigned ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
                    >
                       <path
                         d="M10,50 C30,50 30,20 50,20 C70,20 70,50 90,50 C110,50 110,10 130,30 C140,40 150,50 145,55"
                         fill="none"
                         stroke="currentColor"
                         strokeWidth="3"
                         strokeLinecap="round"
                         className="animate-[draw_2s_ease-out_forwards]"
                         style={{ strokeDasharray: 300, strokeDashoffset: isSigned ? 0 : 300, transition: 'stroke-dashoffset 1.5s ease-out' }}
                       />
                    </svg>

                    {/* Sello de Verificado */}
                    <div className={`absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-0.5 shadow-sm transform transition-transform duration-500 ${isSigned ? 'scale-100' : 'scale-0'}`}>
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
