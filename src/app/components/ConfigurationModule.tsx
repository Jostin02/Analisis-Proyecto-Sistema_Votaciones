import { useState } from 'react';
import { Plus, Calendar, Users, User, Lock } from 'lucide-react';

export function ConfigurationModule() {
  const [activeTab, setActiveTab] = useState<'elections' | 'parties' | 'candidates'>('elections');

  const elections = [
    { id: 1, name: 'Elección Presidencial 2026', date: '2026-11-03', status: 'Activa' },
    { id: 2, name: 'Elecciones Legislativas', date: '2026-11-03', status: 'Activa' },
    { id: 3, name: 'Elecciones Municipales', date: '2026-06-15', status: 'Planeada' },
  ];

  const parties = [
    { id: 1, name: 'Alianza Democrática', abbr: 'AD', color: '#3b82f6' },
    { id: 2, name: 'Unidad Progresista', abbr: 'UP', color: '#10b981' },
    { id: 3, name: 'Coalición Conservadora', abbr: 'CC', color: '#ef4444' },
    { id: 4, name: 'Reforma Independiente', abbr: 'RI', color: '#f59e0b' },
  ];

  const candidates = [
    { id: 1, name: 'Maria Santos', party: 'Alianza Democrática', position: 'Presidente', image: '👤' },
    { id: 2, name: 'John Martinez', party: 'Unidad Progresista', position: 'Presidente', image: '👤' },
    { id: 3, name: 'Ana Rodriguez', party: 'Coalición Conservadora', position: 'Presidente', image: '👤' },
    { id: 4, name: 'Carlos Gomez', party: 'Reforma Independiente', position: 'Presidente', image: '👤' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Módulo de Configuración</h1>
          <p className="text-muted-foreground">Gestionar elecciones, partidos políticos y candidatos</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-semibold">Acceso de Administrador Requerido</span>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="border-b border-border">
          <div className="flex gap-4 p-6">
            <button
              onClick={() => setActiveTab('elections')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'elections'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Elecciones</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('parties')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'parties'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Partidos Políticos</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('candidates')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'candidates'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>Candidatos</span>
              </div>
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'elections' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-card-foreground">Elecciones</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                  <Plus className="w-5 h-5" />
                  <span>Nueva Elección</span>
                </button>
              </div>
              <div className="space-y-3">
                {elections.map((election) => (
                  <div key={election.id} className="p-6 border border-border rounded-lg hover:border-primary transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-card-foreground mb-2">{election.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{election.date}</span>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              election.status === 'Activa'
                                ? 'bg-success/10 text-success'
                                : 'bg-warning/10 text-warning'
                            }`}
                          >
                            {election.status}
                          </span>
                        </div>
                      </div>
                      <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm">
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'parties' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-card-foreground">Partidos Políticos</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                  <Plus className="w-5 h-5" />
                  <span>Nuevo Partido</span>
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {parties.map((party) => (
                  <div key={party.id} className="p-6 border border-border rounded-lg hover:border-primary transition-colors">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: party.color }}
                      >
                        {party.abbr}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-card-foreground mb-1">{party.name}</h3>
                        <p className="text-sm text-muted-foreground">Abreviatura: {party.abbr}</p>
                      </div>
                      <button className="px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm">
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'candidates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-card-foreground">Candidatos</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                  <Plus className="w-5 h-5" />
                  <span>Nuevo Candidato</span>
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="p-6 border border-border rounded-lg hover:border-primary transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-4xl">
                        {candidate.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-card-foreground mb-1">{candidate.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{candidate.position}</p>
                        <p className="text-xs text-primary">{candidate.party}</p>
                      </div>
                      <button className="px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm">
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
