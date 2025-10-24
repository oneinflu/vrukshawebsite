import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {  AuthState } from '../types';
import { authAPI } from './api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setAuthState({
        isAuthenticated: true,
        user: JSON.parse(userData),
        token,
        loading: false,
        error: null,
      });
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const response = await authAPI.login({ email, password });
      
      // Console log the complete login API response
      console.log('Login API Response:', response);
      console.log('Login Response Data:', response.data);
      
      const { token, user } = response.data;
      
      // Ensure user object has the expected structure
      const normalizedUser = {
        ...user,
        // Make sure the user object has an _id property that matches what the app expects
        _id: user.id || user._id
      };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      
      setAuthState({
        isAuthenticated: true,
        user: normalizedUser,
        token,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || 'Login failed',
      }));
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, phone: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const response = await authAPI.register({ name, email, password, phone });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        isAuthenticated: true,
        user,
        token,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || 'Registration failed',
      }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null,
    });
    
    // Call logout API (but don't wait for it)
    authAPI.logout().catch(console.error);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};