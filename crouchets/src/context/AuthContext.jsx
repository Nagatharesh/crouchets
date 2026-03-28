import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('crouchets_user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      if (parsed.email === 'admin@crouchets.com') {
        setIsAdmin(true);
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    if (email === 'admin@crouchets.com' && password === 'admin123') {
      const adminUser = { id: 'admin', name: 'Admin', email: 'admin@crouchets.com', role: 'admin' };
      setUser(adminUser);
      setIsAdmin(true);
      localStorage.setItem('crouchets_user', JSON.stringify(adminUser));
      return { success: true };
    }

    const users = JSON.parse(localStorage.getItem('crouchets_users') || '[]');
    const existingUser = users.find(u => u.email === email && u.password === password);
    
    if (existingUser) {
      const { password: _, ...userWithoutPass } = existingUser;
      setUser(userWithoutPass);
      setIsAdmin(false);
      localStorage.setItem('crouchets_user', JSON.stringify(userWithoutPass));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('crouchets_users') || '[]');
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already exists' };
    }
    
    const newUser = { id: `usr_${Date.now()}`, name, email, password, orders: [] };
    users.push(newUser);
    localStorage.setItem('crouchets_users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPass } = newUser;
    setUser(userWithoutPass);
    setIsAdmin(false);
    localStorage.setItem('crouchets_user', JSON.stringify(userWithoutPass));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('crouchets_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
