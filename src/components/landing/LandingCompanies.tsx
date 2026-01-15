/**
 * Componente Companies Section del Landing Page
 *
 * @description Sección que muestra las empresas que confían en la plataforma
 */

export const LandingCompanies = () => {
  const companies = [
    { name: 'AcmeCorp', icon: 'square' },
    { name: 'Globex', icon: 'circle' },
    { name: 'Soylent', icon: 'diamond' },
    { name: 'Umbrella', icon: 'rounded' },
  ];

  const getIconClass = (icon: string) => {
    const base = 'w-6 h-6 bg-slate-400 group-hover:bg-blue-600 transition-colors duration-300';
    switch (icon) {
      case 'square':
        return `${base} rounded-sm`;
      case 'circle':
        return `${base} rounded-full border-4 border-slate-400 group-hover:border-blue-600`;
      case 'diamond':
        return `${base} transform rotate-45`;
      case 'rounded':
        return `${base} rounded-bl-xl`;
      default:
        return base;
    }
  };

  return (
    <section
      id="platform"
      className="bg-white/50 dark:bg-slate-900/50 py-10 border-y border-slate-100 dark:border-slate-800 backdrop-blur-sm"
    >
      <div className="mx-auto px-6 max-w-7xl">
        <p className="text-center text-sm font-semibold text-slate-400 mb-8 tracking-widest uppercase">
          Impulsando equipos legales globales
        </p>
        <div className="justify-center md:gap-20 flex flex-wrap gap-12 opacity-70">
          {companies.map((company) => (
            <div key={company.name} className="items-center group flex gap-2 cursor-pointer">
              <div className={getIconClass(company.icon)} />
              <span className="text-xl font-bold text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
