// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../services/auth.service';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user khi refresh
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  // ===============================
  // REGISTER
  // ===============================
  const register = async (userData) => {
    try {
      setError(null);

      // ✅ KHÔNG ghi đè role nữa
      const response = await AuthService.register(userData);

      const userDataResponse = response.user || response;

      setUser(userDataResponse);

      return response;

    } catch (err) {
      const message = err.message || 'Registration failed';
      setError(message);
      throw { message };
    }
  };

  // ===============================
  // LOGIN
  // ===============================
  const login = async (email, password) => {
    try {
      setError(null);

      const response = await AuthService.login(email, password);

      const userData = response.user || response;

      setUser(userData);

      return response;

    } catch (err) {
      const message = err.message || 'Login failed';
      setError(message);
      throw { message };
    }
  };

  // ===============================
  // LOGOUT
  // ===============================
  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  // ===============================
  // UPDATE SKILLS
  // ===============================
  const updateUserSkills = (skills) => {
    const updatedUser = { ...user, skills };

    setUser(updatedUser);

    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // ===============================
  // UPDATE PROFILE
  // ===============================
  const updateUserProfile = (profileData) => {
    const updatedUser = { ...user, ...profileData };

    setUser(updatedUser);

    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // ===============================
  // CONTEXT VALUE
  // ===============================
  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateUserSkills,
    updateUserProfile,

    isAuthenticated: AuthService.isAuthenticated,
    userRole: user?.role || 'user',
    userSkills: user?.skills || []
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};