/**
 * Vista Settings
 *
 * @description Configuración del usuario
 * TODO: Implementar formulario de perfil
 * TODO: Implementar cambio de contraseña
 * TODO: Implementar gestión de sesiones
 */

import { useGetCurrentUser } from '@/hooks/api/useGetCurrentUser';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const Settings = () => {
  const { user, isLoading } = useGetCurrentUser();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>

      <Card title="Perfil">
        <div className="space-y-4">
          <Input label="Nombre" value={user?.firstName || ''} />
          <Input label="Apellido" value={user?.lastName || ''} />
          <Input label="Email" type="email" value={user?.email || ''} />
          <Button>Guardar cambios</Button>
        </div>
      </Card>

      <Card title="Cambiar contraseña">
        <div className="space-y-4">
          <Input label="Contraseña actual" type="password" />
          <Input label="Nueva contraseña" type="password" />
          <Input label="Confirmar nueva contraseña" type="password" />
          <Button>Cambiar contraseña</Button>
        </div>
      </Card>

      <Card title="Sesiones activas">
        {/* TODO: Mostrar lista de sesiones */}
        <p className="text-gray-500">No hay sesiones activas</p>
      </Card>
    </div>
  );
};
