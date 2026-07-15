/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import { apiClient } from '../services/apiClient';

export const AuthContext = createContext();

const DEFAULT_USER = {
  name: "Farmer Athit",
  location: "4CP3+PWG, Unnamed Rd, Udayanatham West, Cholamadevi, Tamil Nadu 612902",
  farmSize: 12.5,
  unit: "acres",
  cropPreferences: ["Rice", "Wheat", "Potato"],
  email: "athit@agrigrow.com",
  phone: "+91 9751280089"
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('agri_auth') === 'true';
  });
  const [loading, setLoading] = useState(true);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('agri_theme');
    return savedTheme || 'light';
  });

  // Load user profile from backend database
  useEffect(() => {
    const loadProfile = async () => {
      const isAuth = localStorage.getItem('agri_auth') === 'true';
      if (!isAuth) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const savedUser = JSON.parse(localStorage.getItem('agri_user') || '{}');
        const emailParam = savedUser.email ? `?email=${savedUser.email}` : '';
        const data = await apiClient.get(`/profile${emailParam}`);
        setUser(data);
      } catch (error) {
        console.warn("Failed to load user profile from backend, using defaults/local storage: ", error);
        const saved = localStorage.getItem('agri_user');
        if (saved) {
          try {
            setUser(JSON.parse(saved));
          } catch {
            setUser(DEFAULT_USER);
          }
        } else {
          setUser(DEFAULT_USER);
        }
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      localStorage.setItem('agri_user', JSON.stringify(user));
    }
  }, [user, loading]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('agri_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const getErrorMessage = (error, defaultMsg) => {
    if (error.response?.data) {
      if (typeof error.response.data === 'string') {
        return error.response.data;
      }
      if (typeof error.response.data === 'object') {
        if (error.response.data.message) {
          return error.response.data.message;
        }
        if (error.response.data.error) {
          return error.response.data.error;
        }
      }
    }
    return error.message || defaultMsg;
  };

  const login = async (email, password) => {
    try {
      const data = await apiClient.post('/profile/login', { email, password });
      setUser(data);
      setIsAuthenticated(true);
      localStorage.setItem('agri_auth', 'true');
      localStorage.setItem('agri_user', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Login failed: ", error);
      const errorMsg = getErrorMessage(error, "Invalid credentials.");
      throw new Error(errorMsg, { cause: error });
    }
  };

  const register = async (userData) => {
    try {
      const data = await apiClient.post('/profile/register', userData);
      setUser(data);
      setIsAuthenticated(true);
      localStorage.setItem('agri_auth', 'true');
      localStorage.setItem('agri_user', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Registration failed: ", error);
      const errorMsg = getErrorMessage(error, "Registration failed.");
      throw new Error(errorMsg, { cause: error });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('agri_auth');
    localStorage.removeItem('agri_user');
    setUser(null);
  };

  const updateUser = async (data) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    try {
      await apiClient.put('/profile', updated);
    } catch (error) {
      console.error("Failed to update profile on backend: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register, theme, toggleTheme, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
