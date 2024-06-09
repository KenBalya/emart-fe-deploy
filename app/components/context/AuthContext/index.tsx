// components/context/AuthContext/index.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { LoginRequest, LoginResponse, User, RegisterRequest, CreateBalanceRequest } from './interface';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  register: (credentials: RegisterRequest) => Promise<void>; // Add this line
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data: LoginResponse = await response.json();
      setUser(data.userProfile);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.userProfile)); // Persist user profile
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear user profile
    router.push('/login');
  };

  const createBalance = async (request: CreateBalanceRequest) => {

  }

  const register = async (credentials: RegisterRequest) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }


      const data: LoginResponse = await response.json();

      setUser(data.userProfile);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.userProfile)); 
      router.push('/dashboard'); 
    } catch (error) {
      console.error('Failed to register:', error);
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userProfile = localStorage.getItem('user');
    if (token && userProfile) {
      setToken(token);
      setUser(JSON.parse(userProfile));
      fetch('http://localhost:8080/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => response.json())
      .then(data => {
        setUser(data.userProfile);
        localStorage.setItem('user', JSON.stringify(data.userProfile)); 
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
