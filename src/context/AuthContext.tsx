import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  surname?: string;
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  forgotPassword: (_email: string) => Promise<void>;
  resetPassword: (_otp: string, _newPassword: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

interface SignupData {
  email: string;
  phone: string;
  name: string;
  surname: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo purposes
const MOCK_USER: User = {
  id: '1',
  email: 'demo@blueseamobile.com',
  name: 'Demo',
  surname: 'User',
  phone: '+2348012345678',
  avatar: '',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/login', { email, password });
      
      // Mock login for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'demo@blueseamobile.com' && password === 'password') {
        const token = 'mock_jwt_token';
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(MOCK_USER));
        setUser(MOCK_USER);
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/signup', data);
      
      // Mock signup for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: '2',
        email: data.email,
        name: data.name,
        surname: data.surname,
        phone: data.phone,
      };
      
      const token = 'mock_jwt_token';
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const forgotPassword = async (_email: string) => {
    // TODO: Replace with actual API call
    // await api.post('/auth/forgot-password', { email });
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const resetPassword = async (_otp: string, _newPassword: string) => {
    // TODO: Replace with actual API call
    // await api.post('/auth/reset-password', { otp, newPassword });
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const updateProfile = async (data: Partial<User>) => {
    // TODO: Replace with actual API call
    // const response = await api.put('/user/profile', data);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...data } as User;
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        updateProfile,
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
