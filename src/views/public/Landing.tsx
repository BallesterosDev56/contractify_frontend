/**
 * Vista Landing Page
 *
 * @description Página de inicio pública con diseño completo
 */

import {
  LandingNavbar,
  LandingHero,
  LandingCompanies,
  LandingFeatures,
  LandingComparison,
  LandingCTA,
  LandingFooter,
} from '@/components/landing';

export const Landing = () => {
  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 min-h-screen font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden dark:text-slate-100 relative isolate">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="w-96 h-96 bg-blue-500/10 rounded-full dark:bg-blue-900/20 absolute top-0 left-1/4 blur-3xl mix-blend-multiply dark:mix-blend-normal animate-blob" />
        <div className="w-96 h-96 bg-indigo-500/10 rounded-full dark:bg-indigo-900/20 absolute top-0 right-1/4 blur-3xl mix-blend-multiply dark:mix-blend-normal animate-blob animation-delay-2000" />
        <div className="w-96 h-96 bg-emerald-500/10 rounded-full dark:bg-emerald-900/20 absolute -bottom-32 left-1/3 blur-3xl mix-blend-multiply dark:mix-blend-normal animate-blob animation-delay-4000" />
      </div>

      {/* Navigation */}
      <LandingNavbar />

      {/* Hero Section */}
      <LandingHero />

      {/* Companies Section */}
      <LandingCompanies />

      {/* Features Section */}
      <LandingFeatures />

      {/* Comparison Section */}
      <LandingComparison />

      {/* CTA Section */}
      <LandingCTA />

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};
