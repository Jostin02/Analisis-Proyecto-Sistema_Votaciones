import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText, Table as TableIcon, TrendingUp, UserCheck } from 'lucide-react';

export function AnalyticsDashboard() {
  const votesPerCandidate = [
    { name: 'Maria Santos', votes: 3245, percentage: 36.3, color: '#3b82f6' },
    { name: 'John Martinez', votes: 2876, percentage: 32.2, color: '#10b981' },
    { name: 'Ana Rodriguez', votes: 1987, percentage: 22.2, color: '#f59e0b' },
    { name: 'Carlos Gomez', votes: 834, percentage: 9.3, color: '#ef4444' },
  ];

  const voterTurnout = [
    { category: 'Votaron', value: 8942, color: '#10b981' },
    { category: 'No Votaron', value: 6292, color: '#cbd5e1' },
  ];

  const turnoutByStation = [
    { station: 'MESA-001', turnout: 89, registered: 500 },
    { station: 'MESA-002', turnout: 76, registered: 450 },
    { station: 'MESA-003', turnout: 92, registered: 600 },
    { station: 'MESA-004', turnout: 68, registered: 550 },
  ];

  const totalVotes = votesPerCandidate.reduce((sum, item) => sum + item.votes, 0);
  const turnoutPercentage = ((voterTurnout[0].value / (voterTurnout[0].value + voterTurnout[1].value)) * 100).toFixed(1);

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Análisis y Reportes</h1>
          <p className="text-muted-foreground">Análisis y visualización integral de datos electorales</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg">
            <UserCheck className="w-4 h-4" />
            <span className="text-sm font-semibold">Acceso de Administrador y Analista</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-success text-success-foreground rounded-lg hover:opacity-90 transition-opacity">
            <Download className="w-5 h-5" />
            <span>Exportar a Excel</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity">
            <FileText className="w-5 h-5" />
            <span>Exportar a PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
          <div className="flex items-start gap-3 mb-2 min-h-[2.5rem]">
            <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <h3 className="text-sm font-medium text-muted-foreground">Total de Votos Emitidos</h3>
          </div>
          <p className="text-3xl font-bold text-card-foreground">{totalVotes.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
          <div className="flex items-start gap-3 mb-2 min-h-[2.5rem]">
            <TrendingUp className="w-5 h-5 text-success shrink-0 mt-0.5" />
            <h3 className="text-sm font-medium text-muted-foreground">Participación Electoral</h3>
          </div>
          <p className="text-3xl font-bold text-card-foreground">{turnoutPercentage}%</p>
        </div>
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
          <div className="flex items-start gap-3 mb-2 min-h-[2.5rem]">
            <TrendingUp className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <h3 className="text-sm font-medium text-muted-foreground">Votantes Registrados</h3>
          </div>
          <p className="text-3xl font-bold text-card-foreground">15,234</p>
        </div>
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
          <div className="flex items-start gap-3 mb-2 min-h-[2.5rem]">
            <TableIcon className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <h3 className="text-sm font-medium text-muted-foreground">Casillas</h3>
          </div>
          <p className="text-3xl font-bold text-card-foreground">42</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-card rounded-lg border border-border shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-card-foreground">Total de Votos por Candidato</h2>
            <p className="text-sm text-muted-foreground mt-1">Elección Presidencial 2026</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={votesPerCandidate}>
                <CartesianGrid key="grid-votes" strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis key="x-votes" dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis key="y-votes" tick={{ fontSize: 12 }} />
                <Tooltip
                  key="tooltip-votes"
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                  }}
                />
                <Legend key="legend-votes" />
                <Bar key="bar-votes" dataKey="votes" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-2">
              {votesPerCandidate.map((candidate, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: candidate.color }}></div>
                    <span className="font-medium text-card-foreground">{candidate.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-card-foreground">{candidate.votes.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground ml-2">({candidate.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-card-foreground">Porcentaje de Participación Electoral</h2>
            <p className="text-sm text-muted-foreground mt-1">Tasa de participación general</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  key="pie-turnout"
                  data={voterTurnout}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, value }) => `${category}: ${((value / (voterTurnout[0].value + voterTurnout[1].value)) * 100).toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {voterTurnout.map((entry, index) => (
                    <Cell key={`cell-turnout-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  key="tooltip-turnout"
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {voterTurnout.map((item, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-muted-foreground">{item.category}</span>
                  </div>
                  <p className="text-2xl font-bold text-card-foreground">{item.value.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-card-foreground">Participación por Casilla</h2>
          <p className="text-sm text-muted-foreground mt-1">Tasas de participación en todas las ubicaciones</p>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={turnoutByStation}>
              <CartesianGrid key="grid-station" strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis key="x-station" dataKey="station" tick={{ fontSize: 12 }} />
              <YAxis key="y-station" tick={{ fontSize: 12 }} />
              <Tooltip
                key="tooltip-station"
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                }}
              />
              <Legend key="legend-station" />
              <Bar key="bar-station" dataKey="turnout" fill="#10b981" radius={[8, 8, 0, 0]} name="Participación %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
