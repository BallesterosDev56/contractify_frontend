/**
 * Componente principal de la aplicación
 *
 * @description Configura el router y renderiza las rutas
 */

import { useRoutes } from 'react-router-dom';
import { routesConfig } from '@/routes/routes';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './auth/firebase';

export const App = () => {
  onAuthStateChanged(firebaseAuth, async (user) => {
    if (user) {
      const token = await user.getIdToken();
      console.log("JWT:", token);
    } else {
      console.log("No autenticado");
    }
  });
  const routes = useRoutes(routesConfig);
  return routes;
};

export default App;

