//types\types.ts
import { ReactNode } from 'react';
import type { SupabaseClient, User } from '@supabase/supabase-js';

export interface IconGeneratorContextProps {
  prompt: {
    noun: string;
    adjective: string;
    color: string;
    model: string;
    style: string;
  };
  setPrompt: React.Dispatch<
    React.SetStateAction<{
      noun: string;
      adjective: string;
      color: string;
      model: string;
      style: string;
    }>
  >;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  loading: boolean;
}

export interface IconGeneratorProviderProps {
  children: ReactNode;
}

export interface AuthContextProps {
  supabase: SupabaseClient;
  user: User | null;
  refreshSession: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  updateUser: (updates: any) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
