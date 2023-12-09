//types\types.ts
import { ReactNode } from 'react';
import type { SupabaseClient, User } from '@supabase/supabase-js';

export interface Prompt {
  noun: string;
  adjective: string;
  color: string;
  model: string;
  style: string;
}

export interface IconGeneratorContextProps {
  prompt: Prompt;
  setPrompt: React.Dispatch<React.SetStateAction<Prompt>>;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  loading: boolean;
  onImageLoaded: () => void;
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
  saveImage: (imageUrl: string, prompt: object, model: string) => Promise<void>;
  fetchSavedImages: () => Promise<void>;
  savedImages: SavedImage[];
  loadingSave: boolean;
  credits: number | null;
  getCredits: () => Promise<number | null>;
  decreaseCredits: (amount: number) => Promise<any>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface SavedImage {
  id: number;
  user_id: string;
  image_url: string;
  prompt: string;
  model: string;
}
