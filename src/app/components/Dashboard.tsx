import { Database, Shield, CheckCircle, AlertTriangle, Users, Vote, TrendingUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Dashboard() {
  const { userRole } = useAuth();
  const stats = [
    { label: 'Total de Votantes', value: '15,234', icon: Users, color: 'bg-primary', roles: ['admin', 'registrar'] },
    { label: 'Casillas', value: '42', icon: Vote, color: 'bg-success', roles: ['admin', 'registrar'] },
    { label: 'Elecciones Activas', value: '3', icon: TrendingUp, color: 'bg-warning', roles: ['admin', 'analyst'] },
    { label: 'Elecciones Completadas', value: '12', icon: CheckCircle, color: 'bg-secondary', roles: ['admin', 'analyst'] },
  ];

  const filteredStats = stats.filter(stat => stat.roles.includes(userRole));

  const auditLogs = [
    { timestamp: '2026-05-18 10:30:15', user: 'admin@system', action: 'Configuración Electoral Actualizada', status: 'success' },
    { timestamp: '2026-05-18 09:45:22', user: 'registrar@system', action: 'Nueva Casilla Agregada', status: 'success' },
    { timestamp: '2026-05-18 09:12:08', user: 'analyst@system', action: 'Reporte Generado', status: 'success' },
    { timestamp: '2026-05-18 08:55:41', user: 'admin@system', action: 'Permisos de Usuario Modificados', status: 'warning' },
    { timestamp: '2026-05-18 08:30:19', user: 'registrar@system', action: 'Registro de Votantes Actualizado', status: 'success' },
  ];

  const dbIntegrity = [
    { table: 'voters', records: 15234, status: 'healthy', lastCheck: '2 min ago' },
    { table: 'polling_stations', records: 42, status: 'healthy', lastCheck: '2 min ago' },
    { table: 'candidates', records: 156, status: 'healthy', lastCheck: '2 min ago' },
    { table: 'votes', records: 8942, status: 'healthy', lastCheck: '2 min ago' },
    { table: 'audit_logs', records: 2341, status: 'healthy', lastCheck: '2 min ago' },
  ];

  const getRoleTitle = () => {
    switch (userRole) {
      case 'admin':
        return 'Panel de Administrador';
      case 'analyst':
        return 'Panel de Analista';
      case 'registrar':
        return 'Panel de Registrador';
      default:
        return 'Panel del Sistema';
    }
  };

  const getRoleDescription = () => {
    switch (userRole) {
      case 'admin':
        return 'Vista completa del sistema con seguridad y monitoreo de base de datos';
      case 'analyst':
        return 'Ver análisis electoral y registros de auditoría del sistema';
      case 'registrar':
        return 'Gestionar votantes y operaciones de casillas';
      default:
        return 'Monitorear el estado y actividad del sistema electoral';
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">{getRoleTitle()}</h1>
          <p className="text-muted-foreground">{getRoleDescription()}</p>
        </div>
        <div className={`px-4 py-2 rounded-lg ${
          userRole === 'admin' ? 'bg-destructive/10 text-destructive' :
          userRole === 'analyst' ? 'bg-primary/10 text-primary' :
          'bg-success/10 text-success'
        }`}>
          <p className="text-sm font-semibold capitalize">
            {userRole === 'admin' ? 'Administrador' : userRole === 'analyst' ? 'Analista' : 'Registrador'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-card rounded-lg p-6 border border-border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-card-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {userRole === 'admin' && (
          <div className="bg-card rounded-lg border border-border shadow-sm">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <Database className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-card-foreground">Estado de Integridad de la Base de Datos</h2>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Vista solo para administradores</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dbIntegrity.map((db, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-card-foreground">{db.table}</span>
                        <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">
                          {db.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {db.records.toLocaleString()} registros • Verificado hace {db.lastCheck}
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 p-4 bg-success/10 rounded-lg">
                <Shield className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-success">Todas las restricciones de la base de datos validadas exitosamente</span>
              </div>
            </div>
          </div>
        )}

        <div className={`bg-card rounded-lg border border-border shadow-sm ${userRole === 'admin' ? '' : 'lg:col-span-2'}`}>
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-card-foreground">Registros de Auditoría de Actividad Reciente</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {auditLogs.map((log, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-semibold text-card-foreground">{log.action}</span>
                    {log.status === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div>{log.user}</div>
                    <div className="mt-1">{log.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {userRole === 'registrar' && (
          <div className="bg-card rounded-lg border border-border shadow-sm">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <Vote className="w-6 h-6 text-success" />
                <h2 className="text-xl font-semibold text-card-foreground">Acciones Rápidas</h2>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Atajos para registradores</p>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full p-4 border border-border rounded-lg hover:bg-primary/10 hover:border-primary transition-colors text-left">
                <h3 className="font-semibold text-card-foreground mb-1">Agregar Nueva Casilla</h3>
                <p className="text-sm text-muted-foreground">Registrar una nueva ubicación de votación</p>
              </button>
              <button className="w-full p-4 border border-border rounded-lg hover:bg-primary/10 hover:border-primary transition-colors text-left">
                <h3 className="font-semibold text-card-foreground mb-1">Ingresar Conteo de Votos</h3>
                <p className="text-sm text-muted-foreground">Registrar votos desde las casillas</p>
              </button>
              <button className="w-full p-4 border border-border rounded-lg hover:bg-primary/10 hover:border-primary transition-colors text-left">
                <h3 className="font-semibold text-card-foreground mb-1">Asignar Personal</h3>
                <p className="text-sm text-muted-foreground">Gestionar personal de las casillas</p>
              </button>
            </div>
          </div>
        )}

        {userRole === 'analyst' && (
          <div className="bg-card rounded-lg border border-border shadow-sm">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-card-foreground">Resumen de Análisis</h2>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Resumen de métricas clave</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Tasa de Participación Electoral</span>
                  <span className="text-2xl font-bold text-primary">58.7%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '58.7%' }}></div>
                </div>
              </div>
              <div className="p-4 bg-success/10 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Progreso de Recolección de Datos</span>
                  <span className="text-2xl font-bold text-success">92%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success rounded-full h-2" style={{ width: '92%' }}></div>
                </div>
              </div>
              <button className="w-full p-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Ver Panel de Análisis Completo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
