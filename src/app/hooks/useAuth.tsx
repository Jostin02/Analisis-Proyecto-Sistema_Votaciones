import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  userRole: string;
  username: string;
  login: (role: string, user: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userRole: '',
      username: '',
      login: (role: string, user: string) => {
        set({ isLoggedIn: true, userRole: role, username: user });
      },
      logout: () => {
        set({ isLoggedIn: false, userRole: '', username: '' });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
