import { Home, Settings, Users, BarChart3, Database, MapPin, Vote, LogOut, Shield } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  userRole: string;
  onLogout: () => void;
}

export function Sidebar({ activePage, onNavigate, userRole, onLogout }: SidebarProps) {
  const allMenuItems = [
    { id: 'dashboard', label: 'Panel Principal', icon: Home, roles: ['admin', 'analyst', 'registrar'] },
    { id: 'configuration', label: 'Configuración', icon: Settings, roles: ['admin'] },
    { id: 'polling-stations', label: 'Casillas', icon: MapPin, roles: ['admin', 'registrar'] },
    { id: 'voting-tally', label: 'Votación y Conteo', icon: Vote, roles: ['admin', 'registrar'] },
    { id: 'analytics', label: 'Análisis', icon: BarChart3, roles: ['admin', 'analyst'] },
    { id: 'database', label: 'Esquema de BD', icon: Database, roles: ['admin', 'analyst'] },
    { id: 'users', label: 'Gestión de Usuarios', icon: Users, roles: ['admin'] },
  ];

  const menuItems = allMenuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="w-64 h-screen bg-[var(--sidebar)] text-[var(--sidebar-foreground)] flex flex-col">
      <div className="p-6 border-b border-[var(--sidebar-border)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--sidebar-primary)] rounded-lg flex items-center justify-center">
            <Vote className="w-6 h-6 text-[var(--sidebar-primary-foreground)]" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Sistema Electoral</h1>
            <p className="text-xs text-[var(--muted-foreground)]">Gestión de Votos</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4 px-3">
          <div className="flex items-center gap-2 text-xs bg-[var(--sidebar-accent)] px-3 py-2 rounded-md">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-[var(--sidebar-accent-foreground)]">Sesión Segura Activa</span>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[var(--sidebar-primary)] text-[var(--sidebar-primary-foreground)]'
                    : 'text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-[var(--sidebar-border)]">
        <div className="mb-3 px-3 py-2 bg-[var(--sidebar-accent)] rounded-lg">
          <p className="text-xs text-[var(--muted-foreground)]">Sesión iniciada como</p>
          <p className="font-semibold capitalize">{userRole === 'admin' ? 'Administrador' : userRole === 'analyst' ? 'Analista' : 'Registrador'}</p>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}
