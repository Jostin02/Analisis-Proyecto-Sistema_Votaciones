import { MapPin, Users, Plus, Search, UserCheck } from 'lucide-react';

export function PollingStations() {
  const stations = [
    {
      id: 'MESA-001',
      name: 'Centro Comunitario Central',
      address: 'Calle Principal 123, Distrito 1',
      capacity: 500,
      assigned: 3,
      status: 'Activa',
    },
    {
      id: 'MESA-002',
      name: 'Escuela del Este',
      address: 'Avenida Roble 456, Distrito 2',
      capacity: 450,
      assigned: 3,
      status: 'Activa',
    },
    {
      id: 'MESA-003',
      name: 'Salón Recreativo Parque Oeste',
      address: 'Camino del Parque 789, Distrito 3',
      capacity: 600,
      assigned: 4,
      status: 'Activa',
    },
    {
      id: 'MESA-004',
      name: 'Edificio Municipal Norte',
      address: 'Plaza de Gobierno 321, Distrito 4',
      capacity: 550,
      assigned: 3,
      status: 'Pendiente de Instalación',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Casillas de Votación</h1>
          <p className="text-muted-foreground">Gestionar ubicaciones físicas de votación y asignación de personal</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-lg">
          <UserCheck className="w-4 h-4" />
          <span className="text-sm font-semibold">Acceso de Administrador y Registrador</span>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar casillas..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input-background"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
              <Plus className="w-5 h-5" />
              <span>Nueva Casilla</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-4">
            {stations.map((station) => (
              <div
                key={station.id}
                className="p-6 border border-border rounded-lg hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-lg text-card-foreground">{station.name}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            station.status === 'Activa'
                              ? 'bg-success/10 text-success'
                              : 'bg-warning/10 text-warning'
                          }`}
                        >
                          {station.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{station.address}</p>
                      <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <span className="bg-primary/10 px-2 py-1 rounded">ID: {station.id}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm">
                    Gestionar
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Capacidad de Votantes</p>
                    <p className="font-semibold text-card-foreground">{station.capacity} votantes</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Personal Asignado</p>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <p className="font-semibold text-card-foreground">{station.assigned} miembros</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Utilización</p>
                    <p className="font-semibold text-card-foreground">
                      {Math.round((station.assigned / (station.capacity / 100)) * 100)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-4">Asignación de Personal</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-card-foreground">Casilla</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input-background">
              <option>Seleccionar una casilla</option>
              {stations.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.id} - {station.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-card-foreground">Miembro del Personal</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input-background">
              <option>Seleccionar miembro del personal</option>
              <option>Juan Pérez - Supervisor</option>
              <option>María García - Monitor</option>
              <option>Roberto Martínez - Asistente</option>
            </select>
          </div>
        </div>
        <button className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
          Asignar Personal
        </button>
      </div>
    </div>
  );
}
