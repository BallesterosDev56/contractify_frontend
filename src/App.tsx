/**
 * Componente principal de la aplicación
 *
 * @description Configura el router y renderiza las rutas
 */

import { useRoutes } from 'react-router-dom';
import { routesConfig } from '@/routes/routes';

export const App = () => {
  const routes = useRoutes(routesConfig);
  return routes;
};

export default App;

