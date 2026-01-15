/**
 * Componente Card base
 *
 * @description Tarjeta reutilizable para contener contenido
 * TODO: Implementar variantes de estilo
 * TODO: Implementar acciones en el header
 */

import type { FC, ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  headerActions?: ReactNode;
}

export const Card: FC<CardProps> = ({ children, title, className = '', headerActions }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
