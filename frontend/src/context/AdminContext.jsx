import React, { createContext, useState, useContext, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedToken = localStorage.getItem('adminToken');
        const expectedToken = "kingmarket_admin_token_123"; // Hardcoded for now
        
        const isValid = storedToken === expectedToken;
        setIsAuthenticated(isValid);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (username, password) => {
    // Hardcoded credentials for now
    const isValid = 
      username === "admin" && 
      password === "SecurePassword123!";
    
    if (isValid) {
      setIsAuthenticated(true);
      localStorage.setItem('adminToken', "kingmarket_admin_token_123");
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
  };

  return (
    <AdminContext.Provider value={{ 
      isAuthenticated, 
      loading, 
      login, 
      logout 
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);