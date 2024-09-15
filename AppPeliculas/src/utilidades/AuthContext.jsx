import React, { createContext, useState, useContext } from 'react';
import { comprobarValidezToken } from '../api-calls/appPeliculas';
import { removeToken, removeFechaExpiracion } from './sessionStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    const tokenValido = comprobarValidezToken();
    if (tokenValido) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    removeToken();
    removeFechaExpiracion();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);