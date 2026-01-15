/**
 * Configuración de rutas de la aplicación
 *
 * @description Define todas las rutas públicas y privadas
 * Siguiendo el patrón de React Router v6 con array de configuración
 */

import { lazy } from 'react';
import { ProtectRoute } from '@/components/ProtectRoute';
import { MainLayout } from '@/components/layout/MainLayout';
import { ROUTES } from '@/constants/app.constants';

// Vistas públicas
import { Landing } from '@/views/public/Landing';
import { Login } from '@/views/public/Login';
import { Register } from '@/views/public/Register';
import { VerifyEmail } from '@/views/public/VerifyEmail';
import { ResetPassword } from '@/views/public/ResetPassword';
import { SignGuest } from '@/views/public/SignGuest';

// Vistas privadas
import { Dashboard } from '@/views/private/Dashboard';
import { Contracts } from '@/views/private/Contracts';
import { NewContract } from '@/views/private/NewContract';
import { ContractForm } from '@/views/private/ContractForm';
import { ContractPreview } from '@/views/private/ContractPreview';
import { ContractDetail } from '@/views/private/ContractDetail';
import { SendContract } from '@/views/private/SendContract';
import { Settings } from '@/views/private/Settings';

export const routesConfig = [
  // Rutas públicas
  {
    path: ROUTES.LANDING,
    element: <Landing />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTES.VERIFY_EMAIL,
    element: <VerifyEmail />,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: <ResetPassword />,
  },
  {
    path: ROUTES.SIGN_GUEST,
    element: <SignGuest />,
  },

  // Rutas privadas con layout
  {
    element: (
      <ProtectRoute>
        <MainLayout />
      </ProtectRoute>
    ),
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.CONTRACTS,
        element: <Contracts />,
      },
      {
        path: ROUTES.NEW_CONTRACT,
        element: <NewContract />,
      },
      {
        path: ROUTES.CONTRACT_FORM,
        element: <ContractForm />,
      },
      {
        path: ROUTES.CONTRACT_PREVIEW,
        element: <ContractPreview />,
      },
      {
        path: ROUTES.CONTRACT_DETAIL,
        element: <ContractDetail />,
      },
      {
        path: ROUTES.SEND_CONTRACT,
        element: <SendContract />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <Settings />,
      },
    ],
  },
];
