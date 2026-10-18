import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, getFromStorage, saveToStorage, removeFromStorage } from '../utils/storage';

const AuthContext = createContext(null);

// Pre-seeded member account for testing convenience
const DEFAULT_DEMO_USERS = [
  {
    id: 'user-member-1',
    name: 'Aarav Sharma',
    email: 'demo@pranayoga.com',
    password: 'prana123',
    joinedAt: '2026-01-15T10:00:00.000Z',
    role: 'Practitioner',
  },
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = getFromStorage(STORAGE_KEYS.USERS, null);
    if (!saved || saved.length === 0) {
      saveToStorage(STORAGE_KEYS.USERS, DEFAULT_DEMO_USERS);
      return DEFAULT_DEMO_USERS;
    }
    return saved;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return getFromStorage(STORAGE_KEYS.ACTIVE_USER, null);
  });

  const [loading, setLoading] = useState(false);

  // Sync users to storage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.USERS, users);
  }, [users]);

  // Sync active user to storage
  useEffect(() => {
    if (currentUser) {
      saveToStorage(STORAGE_KEYS.ACTIVE_USER, currentUser);
    } else {
      removeFromStorage(STORAGE_KEYS.ACTIVE_USER);
    }
  }, [currentUser]);

  // Sign up a new user
  const signup = async ({ name, email, password }) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 350));

    const normalizedEmail = email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (existing) {
      setLoading(false);
      return { success: false, message: 'An account with this email address already exists.' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password: password,
      joinedAt: new Date().toISOString(),
      role: 'Practitioner',
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    setLoading(false);

    return { success: true, user: newUser };
  };

  // Log in existing user
  const login = async (email, password) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 350));

    const normalizedEmail = email.trim().toLowerCase();
    const matched = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!matched) {
      setLoading(false);
      return { success: false, message: 'No registered account found with this email.' };
    }

    if (matched.password !== password) {
      setLoading(false);
      return { success: false, message: 'Incorrect password. Please verify and try again.' };
    }

    setCurrentUser(matched);
    setLoading(false);
    return { success: true, user: matched };
  };

  // Instant login helper for testing
  const loginAsDemo = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    const demoUser = users.find((u) => u.email === 'demo@pranayoga.com') || DEFAULT_DEMO_USERS[0];
    setCurrentUser(demoUser);
    setLoading(false);
    return { success: true, user: demoUser };
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        loading,
        isAuthenticated: !!currentUser,
        signup,
        login,
        loginAsDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
