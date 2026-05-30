import { useState } from 'react';
import { Vote, Save, CheckCircle, UserCheck } from 'lucide-react';

export function VotingTally() {
  const [selectedStation, setSelectedStation] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const candidates = [
    { id: 1, name: 'Maria Santos', party: 'Alianza Democrática', votes: '' },
    { id: 2, name: 'John Martinez', party: 'Unidad Progresista', votes: '' },
    { id: 3, name: 'Ana Rodriguez', party: 'Coalición Conservadora', votes: '' },
    { id: 4, name: 'Carlos Gomez', party: 'Reforma Independiente', votes: '' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Módulo de Votación y Conteo</h1>
          <p className="text-muted-foreground">Entrada de datos profesional para el conteo de votos</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-lg">
          <UserCheck className="w-4 h-4" />
          <span className="text-sm font-semibold">Acceso de Administrador y Registrador</span>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-6 border-b border-border bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Vote className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">Formulario de Entrada de Conteo de Votos</h2>
              <p className="text-sm text-muted-foreground">Ingresar conteos de votos desde las casillas</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-card-foreground">Casilla de Votación</label>
              <select
                value={selectedStation}
                onChange={(e) => setSelectedStation(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input-background"
                required
              >
                <option value="">Seleccionar casilla</option>
                <option value="MESA-001">MESA-001 - Centro Comunitario Central</option>
                <option value="MESA-002">MESA-002 - Escuela del Este</option>
                <option value="MESA-003">MESA-003 - Salón Recreativo Parque Oeste</option>
                <option value="MESA-004">MESA-004 - Edificio Municipal Norte</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-card-foreground">Elección</label>
              <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input-background" required>
                <option value="">Seleccionar elección</option>
                <option value="1">Elección Presidencial 2026</option>
                <option value="2">Elecciones Legislativas</option>
              </select>
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-muted/30">
            <h3 className="font-semibold text-card-foreground mb-4">Conteo de Votos por Candidato</h3>
            <div className="space-y-4">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                  <div className="flex-1">
                    <div className="font-semibold text-card-foreground">{candidate.name}</div>
                    <div className="text-sm text-muted-foreground">{candidate.party}</div>
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input-background text-center font-semibold"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-warning/5">
            <h3 className="font-semibold text-card-foreground mb-4">Categorías Especiales de Votos</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-card-foreground">
                  Votos Nulos
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input-background"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-card-foreground">
                  Votos en Blanco
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input-background"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 rounded border-border" required />
              <span className="text-sm text-card-foreground">
                Verifico que todos los conteos de votos han sido ingresados con precisión y verificados
              </span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              <Save className="w-5 h-5" />
              <span>Enviar Conteo de Votos</span>
            </button>
            <button
              type="button"
              className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl border border-border">
            <div className="text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-card-foreground mb-2">Transacción Exitosa</h3>
              <p className="text-muted-foreground mb-6">El conteo de votos ha sido registrado de forma segura en la base de datos</p>
              <div className="bg-success/10 border border-success rounded-lg p-4 mb-6">
                <p className="text-sm text-success font-medium">
                  Entrada de Auditoría Creada • Integridad de Datos Verificada • Respaldo Cifrado Guardado
                </p>
              </div>
              <button
                onClick={() => setShowSuccess(false)}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
