import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { authService, type UserProfile } from '../services/authService';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        try {
          setCurrentUser(user);
          
          if (user) {
            try {
              const profile = await authService.getUserProfile(user.uid);
              setUserProfile(profile);
            } catch (error) {
              console.error('Erro ao buscar perfil do usuário:', error);
              setUserProfile(null);
            }
          } else {
            setUserProfile(null);
          }
        } catch (error) {
          console.error('Erro no estado de autenticação:', error);
        } finally {
          setLoading(false);
        }
      });

      return unsubscribe;
    } catch (error) {
      console.error('Erro ao configurar listener de autenticação:', error);
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    await authService.login(email, password);
  };

  const register = async (email: string, password: string, displayName: string) => {
    await authService.register(email, password, displayName);
  };

  const logout = async () => {
    await authService.logout();
    setUserProfile(null);
  };

  const refreshProfile = async () => {
    if (currentUser) {
      try {
        const profile = await authService.getUserProfile(currentUser.uid);
        setUserProfile(profile);
      } catch (error) {
        console.error('Erro ao recarregar perfil:', error);
      }
    }
  };

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    login,
    register,
    logout,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

