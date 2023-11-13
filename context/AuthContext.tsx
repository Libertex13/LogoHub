// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '@/utils/supabase';
import type { User } from '@supabase/supabase-js';
import { AuthContextProps, AuthProviderProps, SavedImage } from '@/types/types';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [savedImages, setSavedImages] = useState<SavedImage[]>([]);

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

  async function downloadImage(imageUrl: string) {
    try {
      console.log('invalid Imageurl  ' + imageUrl);
      const response = await fetch(
        `/api/fetch-image?imageUrl=${encodeURIComponent(imageUrl)}`
      );
      if (!response.ok) {
        throw new Error('Image fetch failed');
      }
      return await response.blob();
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }

  const uploadImage = async (blob: Blob, fileName: string): Promise<any> => {
    if (!user) {
      throw new Error('No authenticated user found.');
    }

    const userId = user.id;
    const uniqueFileName = fileName || `image-${new Date().getTime()}.png`; // Default file extension can be changed based on blob type

    const response = await supabase.storage
      .from('images')
      .upload(`${userId}/${uniqueFileName}`, blob);

    return response;
  };

  const createSignedUrl = async (filePath: string): Promise<string | null> => {
    try {
      if (!user) {
        throw new Error('No authenticated user found.');
      }

      // One year in seconds
      const oneYearInSeconds = 365 * 24 * 60 * 60;

      const { data, error } = await supabase.storage
        .from('images')
        .createSignedUrl(filePath, oneYearInSeconds);

      if (error) {
        console.error('Error creating signed URL:', error);
        return null;
      }

      return data.signedUrl; // Assuming 'data' has a 'signedUrl' property
    } catch (error) {
      console.error('Error in createSignedUrl:', error);
      return null;
    }
  };

  const saveImage = async (imageUrl: string, prompt: object, model: string) => {
    if (user) {
      const blob = await downloadImage(imageUrl);
      if (!blob) {
        console.error('Failed to download image or image is undefined');
        return;
      }

      const fileName = `img-${new Date().getTime()}.png`;
      await uploadImage(blob, fileName);

      const filePath = `${user.id}/${fileName}`;
      const signedUrl = await createSignedUrl(filePath);
      if (!signedUrl) {
        console.error('Failed to create signed URL');
        return;
      }

      const response = await supabase.from('saved_images').insert([
        {
          user_id: user.id,
          image_url: signedUrl,
          prompt: JSON.stringify(prompt),
          model: model
        }
      ]);

      // For debugging: Log the response and the data sent
      console.log('Response:', response);
      console.log('Data sent:', {
        user_id: user.id,
        image_url: signedUrl,
        prompt: JSON.stringify(prompt),
        model: model
      });
    }
  };

  const fetchSavedImages = async () => {
    if (user) {
      const { data, error } = await supabase
        .from('saved_images')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching images:', error);
      } else {
        setSavedImages(data);
      }
    }
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
        signOut,
        saveImage,
        fetchSavedImages,
        savedImages
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
