import { Database, Key, Link, Table as TableIcon, UserCheck } from 'lucide-react';

export function DatabaseSchema() {
  const tables = [
    {
      name: 'voters',
      description: 'Información de votantes registrados',
      columns: [
        { name: 'voter_id', type: 'INTEGER', isPrimary: true, description: 'Identificador único de votante' },
        { name: 'first_name', type: 'VARCHAR(100)', isPrimary: false, description: 'Nombre del votante' },
        { name: 'last_name', type: 'VARCHAR(100)', isPrimary: false, description: 'Apellido del votante' },
        { name: 'id_number', type: 'VARCHAR(20)', isPrimary: false, description: 'Número de identificación nacional' },
        { name: 'polling_station_id', type: 'INTEGER', isPrimary: false, description: 'Casilla asignada' },
        { name: 'registration_date', type: 'TIMESTAMP', isPrimary: false, description: 'Fecha de registro' },
      ],
      relationships: ['polling_stations (polling_station_id)'],
    },
    {
      name: 'polling_stations',
      description: 'Ubicaciones físicas de votación (Casillas)',
      columns: [
        { name: 'station_id', type: 'INTEGER', isPrimary: true, description: 'Identificador único de casilla' },
        { name: 'station_code', type: 'VARCHAR(20)', isPrimary: false, description: 'Código de casilla (ej., MESA-001)' },
        { name: 'name', type: 'VARCHAR(200)', isPrimary: false, description: 'Nombre de la casilla' },
        { name: 'address', type: 'TEXT', isPrimary: false, description: 'Dirección física' },
        { name: 'capacity', type: 'INTEGER', isPrimary: false, description: 'Capacidad máxima de votantes' },
        { name: 'status', type: 'VARCHAR(50)', isPrimary: false, description: 'Estado de la casilla' },
      ],
      relationships: ['voters (station_id)', 'votes (station_id)'],
    },
    {
      name: 'candidates',
      description: 'Información de candidatos electorales',
      columns: [
        { name: 'candidate_id', type: 'INTEGER', isPrimary: true, description: 'Identificador único de candidato' },
        { name: 'first_name', type: 'VARCHAR(100)', isPrimary: false, description: 'Nombre del candidato' },
        { name: 'last_name', type: 'VARCHAR(100)', isPrimary: false, description: 'Apellido del candidato' },
        { name: 'party_id', type: 'INTEGER', isPrimary: false, description: 'Partido político' },
        { name: 'position', type: 'VARCHAR(100)', isPrimary: false, description: 'Posición electoral' },
        { name: 'photo_url', type: 'VARCHAR(500)', isPrimary: false, description: 'Foto del candidato' },
      ],
      relationships: ['political_parties (party_id)', 'votes (candidate_id)'],
    },
    {
      name: 'votes',
      description: 'Conteos y resultados de votos',
      columns: [
        { name: 'vote_id', type: 'INTEGER', isPrimary: true, description: 'Identificador único de registro de voto' },
        { name: 'station_id', type: 'INTEGER', isPrimary: false, description: 'Casilla de votación' },
        { name: 'candidate_id', type: 'INTEGER', isPrimary: false, description: 'Candidato votado' },
        { name: 'election_id', type: 'INTEGER', isPrimary: false, description: 'Referencia de elección' },
        { name: 'vote_count', type: 'INTEGER', isPrimary: false, description: 'Número de votos' },
        { name: 'vote_type', type: 'VARCHAR(20)', isPrimary: false, description: 'Válido/Nulo/Blanco' },
        { name: 'recorded_at', type: 'TIMESTAMP', isPrimary: false, description: 'Marca de tiempo de registro' },
      ],
      relationships: ['polling_stations (station_id)', 'candidates (candidate_id)', 'elections (election_id)'],
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Visor de Esquema de Base de Datos</h1>
          <p className="text-muted-foreground">Representación visual de la estructura y relaciones de la base de datos electoral</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg">
          <UserCheck className="w-4 h-4" />
          <span className="text-sm font-semibold">Acceso de Administrador y Analista</span>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Database className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Base de Datos del Sistema Electoral</h2>
            <p className="text-sm text-muted-foreground">PostgreSQL 15 - Compatible con ACID con Integridad Referencial Completa</p>
          </div>
        </div>

        <div className="grid gap-6">
          {tables.map((table, index) => (
            <div key={index} className="border border-border rounded-lg overflow-hidden">
              <div className="bg-primary/10 p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <TableIcon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg text-card-foreground">{table.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{table.description}</p>
              </div>

              <div className="bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/30 border-b border-border">
                      <tr>
                        <th className="text-left p-3 text-sm font-semibold text-card-foreground">Nombre de Columna</th>
                        <th className="text-left p-3 text-sm font-semibold text-card-foreground">Tipo de Dato</th>
                        <th className="text-left p-3 text-sm font-semibold text-card-foreground">Restricción</th>
                        <th className="text-left p-3 text-sm font-semibold text-card-foreground">Descripción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.columns.map((column, colIndex) => (
                        <tr key={colIndex} className="border-b border-border hover:bg-muted/20">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {column.isPrimary && <Key className="w-4 h-4 text-warning" />}
                              <span className="font-mono text-sm text-card-foreground">{column.name}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="font-mono text-sm text-muted-foreground">{column.type}</span>
                          </td>
                          <td className="p-3">
                            {column.isPrimary && (
                              <span className="px-2 py-1 bg-warning/10 text-warning rounded text-xs font-semibold">
                                PRIMARY KEY
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">{column.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {table.relationships.length > 0 && (
                  <div className="p-4 bg-primary/5 border-t border-border">
                    <div className="flex items-start gap-2">
                      <Link className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-card-foreground mb-1">Relaciones:</p>
                        <div className="flex flex-wrap gap-2">
                          {table.relationships.map((rel, relIndex) => (
                            <span
                              key={relIndex}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                            >
                              {rel}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border border-border shadow-sm p-6">
          <h3 className="font-semibold text-card-foreground mb-3">Integridad de Datos</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Restricciones de Llave Foránea
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Validaciones NOT NULL
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Índices Únicos
            </li>
          </ul>
        </div>

        <div className="bg-card rounded-lg border border-border shadow-sm p-6">
          <h3 className="font-semibold text-card-foreground mb-3">Seguridad</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Cifrado en Reposo
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Acceso Basado en Roles
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Registro de Auditoría Habilitado
            </li>
          </ul>
        </div>

        <div className="bg-card rounded-lg border border-border shadow-sm p-6">
          <h3 className="font-semibold text-card-foreground mb-3">Rendimiento</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Índices Optimizados
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Caché de Consultas
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Agrupación de Conexiones
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
