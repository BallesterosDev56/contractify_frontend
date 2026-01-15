/**
 * Hook para auto-guardado de borradores
 *
 * @description Implementa auto-guardado cada 30 segundos:
 * - Guarda automáticamente los cambios
 * - Evita pérdida de datos
 *
 * TODO: Implementar debounce para evitar guardados innecesarios
 * TODO: Implementar indicador visual de guardado
 */

import { useEffect, useRef } from 'react';

export const useAutoSave = (
  saveFn: () => void | Promise<void>,
  data: unknown,
  interval: number = 30000
) => {
  const dataRef = useRef(data);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      // TODO: Comparar dataRef.current con data anterior para evitar guardados innecesarios
      await saveFn();
    }, interval);

    return () => clearInterval(intervalId);
  }, [saveFn, interval]);
};
