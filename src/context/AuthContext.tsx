import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User, AuthState, LoginFormData, SignupFormData } from '@/types';

interface AuthContextType extends AuthState {
  login: (data: LoginFormData) => Promise<void>;
  signup: (data: SignupFormData) => Promise<void>;
  logout: () => void;
  googleLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo
const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  firstName: 'John',
  surname: 'Doe',
  phone: '+2348012345678',
  balance: 5000,
  bluePoints: 250,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: false,
  });

  const login = useCallback(async (_data: LoginFormData) => {
    setState(prev => ({ ...prev, loading: true }));
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setState({
      isAuthenticated: true,
      user: mockUser,
      loading: false,
    });
  }, []);

  const signup = useCallback(async (data: SignupFormData) => {
    setState(prev => ({ ...prev, loading: true }));
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setState({
      isAuthenticated: true,
      user: { ...mockUser, email: data.email, firstName: data.firstName, surname: data.surname, phone: data.phone },
      loading: false,
    });
  }, []);

  const logout = useCallback(() => {
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  }, []);

  const googleLogin = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setState({
      isAuthenticated: true,
      user: mockUser,
      loading: false,
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
