import { Users, Plus, Shield, UserCheck, UserX, Lock } from 'lucide-react';

export function UserManagement() {
  const users = [
    {
      id: 1,
      username: 'admin@system',
      name: 'Administrador del Sistema',
      role: 'Administrador',
      status: 'Activo',
      lastLogin: '2026-05-18 10:30:15',
    },
    {
      id: 2,
      username: 'analyst@system',
      name: 'Analista de Datos',
      role: 'Analista',
      status: 'Activo',
      lastLogin: '2026-05-18 09:12:08',
    },
    {
      id: 3,
      username: 'registrar@system',
      name: 'Registrador de Votantes',
      role: 'Registrador',
      status: 'Activo',
      lastLogin: '2026-05-18 09:45:22',
    },
    {
      id: 4,
      username: 'observer@system',
      name: 'Observador Electoral',
      role: 'Analista',
      status: 'Inactivo',
      lastLogin: '2026-05-15 14:22:11',
    },
  ];

  const roleColors: Record<string, string> = {
    Administrador: 'bg-destructive/10 text-destructive',
    Analista: 'bg-primary/10 text-primary',
    Registrador: 'bg-success/10 text-success',
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">Gestionar usuarios del sistema y control de acceso basado en roles</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-semibold">Solo Administrador</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">Total de Usuarios</h3>
          </div>
          <p className="text-3xl font-bold text-card-foreground">24</p>
        </div>
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <UserCheck className="w-5 h-5 text-success" />
            <h3 className="text-sm font-medium text-muted-foreground">Usuarios Activos</h3>
          </div>
          <p className="text-3xl font-bold text-card-foreground">21</p>
        </div>
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <UserX className="w-5 h-5 text-warning" />
            <h3 className="text-sm font-medium text-muted-foreground">Usuarios Inactivos</h3>
          </div>
          <p className="text-3xl font-bold text-card-foreground">3</p>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Usuarios del Sistema</h2>
            <p className="text-sm text-muted-foreground mt-1">Gestionar cuentas de usuario y permisos</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-5 h-5" />
            <span>Nuevo Usuario</span>
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-6 border border-border rounded-lg hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground mb-1">{user.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{user.username}</p>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                          {user.role}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === 'Activo'
                              ? 'bg-success/10 text-success'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {user.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-2">Último Acceso</p>
                    <p className="text-sm font-medium text-card-foreground">{user.lastLogin}</p>
                    <div className="flex gap-2 mt-3">
                      <button className="px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm">
                        Editar
                      </button>
                      <button className="px-3 py-2 border border-border rounded-lg hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition-colors text-sm">
                        Revocar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-4">Permisos de Rol</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-destructive rounded-full"></div>
              Administrador
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Acceso total al sistema</li>
              <li>• Gestión de usuarios</li>
              <li>• Configuración del sistema</li>
              <li>• Exportación/importación de datos</li>
            </ul>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Analista
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Ver reportes</li>
              <li>• Generar análisis</li>
              <li>• Exportar datos</li>
              <li>• Acceso de solo lectura</li>
            </ul>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              Registrador
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Gestionar votantes</li>
              <li>• Gestionar casillas</li>
              <li>• Ingresar conteos de votos</li>
              <li>• Configuración limitada</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
