// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '@/utils/supabase';
import type { SupabaseClient, User } from '@supabase/supabase-js';

interface AuthContextProps {
  supabase: SupabaseClient;
  user: User | null;
  refreshSession: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  updateUser: (updates: any) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };

    initializeSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const refreshSession = async () => {
    const { data } = await supabase.auth.refreshSession();
    setUser(data?.session?.user || null);
  };

  const getCurrentUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data?.user || null);
  };

  const updateUser = async (updates: any) => {
    const { data, error } = await supabase.auth.updateUser(updates);
    if (!error && data) {
      setUser(data.user);
    }
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        supabase,
        user,
        refreshSession,
        getCurrentUser,
        updateUser,
        signInWithGoogle,
        signOut
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

export default AuthProvider;
