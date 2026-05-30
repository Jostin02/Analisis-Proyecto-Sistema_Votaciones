import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Vote, Lock, User, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function LoginScreen() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const roles = [
    {
      id: 'admin',
      name: 'Administrador',
      description: 'Acceso total al sistema y configuración',
      icon: Shield,
      color: 'bg-destructive',
    },
    {
      id: 'analyst',
      name: 'Analista',
      description: 'Ver reportes y análisis',
      icon: User,
      color: 'bg-primary',
    },
    {
      id: 'registrar',
      name: 'Registrador',
      description: 'Gestionar votantes y casillas',
      icon: User,
      color: 'bg-success',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole && username && password) {
      login(selectedRole, username);

      // Navigate to default page based on role
      if (selectedRole === 'analyst') {
        navigate('/analytics');
      } else if (selectedRole === 'registrar') {
        navigate('/polling-stations');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="bg-card rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-primary p-12 text-primary-foreground flex flex-col justify-center">
              <div className="mb-8">
                <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mb-4">
                  <Vote className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Sistema de Gestión Electoral</h1>
                <p className="text-primary-foreground/80">Plataforma de Votación Segura y Transparente</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Cifrado de Extremo a Extremo</h3>
                    <p className="text-sm text-primary-foreground/70">Todas las sesiones están cifradas con protocolos SSL/TLS</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Autenticación Multifactor</h3>
                    <p className="text-sm text-primary-foreground/70">Control de acceso basado en roles para mayor seguridad</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12">
              <h2 className="text-2xl font-semibold mb-6 text-card-foreground">Seleccionar Rol e Iniciar Sesión</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-card-foreground">Rol de Usuario</label>
                  <div className="grid grid-cols-1 gap-3">
                    {roles.map((role) => {
                      const Icon = role.icon;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => setSelectedRole(role.id)}
                          className={`p-4 border-2 rounded-lg text-left transition-all ${
                            selectedRole === role.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${role.color} rounded-lg flex items-center justify-center`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-card-foreground">{role.name}</div>
                              <div className="text-sm text-muted-foreground">{role.description}</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-card-foreground">Usuario</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input-background"
                    placeholder="Ingrese su usuario"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-card-foreground">Contraseña</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input-background"
                    placeholder="Ingrese su contraseña"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedRole || !username || !password}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Iniciar Sesión de Forma Segura
                </button>

                <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 text-success" />
                  <span>Protegido con cifrado de 256 bits</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
