import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for session on mount
    const session = localStorage.getItem('crouchets_session');
    if (session) {
      try {
        const data = JSON.parse(session);
        // Session expires after 24 hours (24 * 60 * 60 * 1000 ms)
        if (Date.now() - data.time < 86400000) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          localStorage.removeItem('crouchets_session');
        }
      } catch (e) {
        localStorage.removeItem('crouchets_session');
      }
    }
    setLoading(false);
  }, []);

  // Backwards compatibility for the existing AdminLogin.jsx
  const login = (username, password) => {
    return loginAdmin(username, password);
  };

  const loginAdmin = (username, password) => {
    // Hardcoded credentials
    if (username === 'crouchets_admin' && password === 'crochet@2024') {
      const sessionData = { 
        time: Date.now(), 
        user: { role: 'admin', name: 'Admin', email: 'admin@crouchets.com' } 
      };
      localStorage.setItem('crouchets_session', JSON.stringify(sessionData));
      setIsAuthenticated(true);
      setUser(sessionData.user);
      return true;
    }
    return false;
  };

  const loginUser = (email, password) => {
    // Accept any email/password for the dummy user login
    const sessionData = { 
      time: Date.now(), 
      user: { role: 'user', email: email, name: email.split('@')[0] } 
    };
    localStorage.setItem('crouchets_session', JSON.stringify(sessionData));
    setIsAuthenticated(true);
    setUser(sessionData.user);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('crouchets_session');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, loginAdmin, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
