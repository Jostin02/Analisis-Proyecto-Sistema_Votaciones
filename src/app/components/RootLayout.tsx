import { Outlet, useNavigate, useLocation } from 'react-router';
import { Sidebar } from './Sidebar';
import { useAuth } from '../hooks/useAuth';

export function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const getPageFromPath = (path: string): string => {
    return path.substring(1) || 'dashboard';
  };

  const hasPermission = (page: string) => {
    const permissions: Record<string, string[]> = {
      dashboard: ['admin', 'analyst', 'registrar'],
      configuration: ['admin'],
      'polling-stations': ['admin', 'registrar'],
      'voting-tally': ['admin', 'registrar'],
      analytics: ['admin', 'analyst'],
      database: ['admin', 'analyst'],
      users: ['admin'],
    };
    return permissions[page]?.includes(userRole) || false;
  };

  const currentPage = getPageFromPath(location.pathname);
  const canAccessPage = hasPermission(currentPage);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        activePage={currentPage}
        onNavigate={(page) => {
          if (hasPermission(page)) {
            navigate(`/${page}`);
          }
        }}
        userRole={userRole}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-y-auto">
        {canAccessPage ? (
          <Outlet context={{ userRole }} />
        ) : (
          <div className="p-8">
            <div className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold mb-2">Acceso Denegado</h2>
              <p>No tienes permiso para ver esta página.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
