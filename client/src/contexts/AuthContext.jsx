import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getUserProfile } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const currentPath = window.location.pathname;

      // Prevent mock login on unauthenticated pages
      if (
        import.meta.env.VITE_OTP_ENABLED === 'false' &&
        !['/login', '/register', '/verify-otp', '/reset-password'].includes(currentPath)
      ) {
        console.log('OTP disabled. Mocking user login for testing.');
        setUser({ name: 'Test User', role: 'Voter', mobile: '+252900000000' });
        setLoading(false);
        return;
      }      

      if (token) {
        try {
          const profile = await getUserProfile();
          setUser(profile.data);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

