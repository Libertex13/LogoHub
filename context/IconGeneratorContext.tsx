//context\IconGeneratorContext.tsx
import React, { createContext, useState } from 'react';
import {
  IconGeneratorContextProps,
  IconGeneratorProviderProps
} from '@/types/types';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export const IconGeneratorContext =
  createContext<IconGeneratorContextProps | null>(null);

export const IconGeneratorProvider: React.FC<IconGeneratorProviderProps> = ({
  children
}) => {
  const [prompt, setPrompt] = useState({
    noun: '',
    adjective: '',
    color: '',
    model: '',
    style: ''
  });
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { user, decreaseCredits, getCredits } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      console.log('No user found, skipping image generation');
      toast.error('Please log in to generate images.');
      return;
    }

    setLoading(true);

    // Get form data
    const formData = new FormData(e.currentTarget);
    const updatedPrompt = {
      noun: formData.get('noun') as string,
      adjective: formData.get('adjective') as string,
      color: formData.get('color') as string,
      model: formData.get('model') as string,
      style: formData.get('style') as string
    };

    setPrompt(updatedPrompt);

    // Check current credits
    const currentCredits = await getCredits();
    const decreaseAmount = updatedPrompt.model === 'dall-e-3' ? 2 : 1;

    if (currentCredits === null || currentCredits < decreaseAmount) {
      toast.error('Insufficient credits to generate this image.');
      setLoading(false);
      return;
    }

    const description = `Design an ${updatedPrompt.adjective} ${updatedPrompt.noun}-themed icon. Use a ${updatedPrompt.color} color palette, styled in a ${updatedPrompt.style} manner.`;

    try {
      const response = await fetch('/api/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: description,
          model: updatedPrompt.model
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setImageUrl(data.data[0].url);

      // Decrease credits
      await decreaseCredits(decreaseAmount);
      toast.success('Image generated successfully. Credits deducted.');
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
        toast.error(`Failed to generate image: ${err.message}`);
      } else {
        setError('An unknown error occurred');
        toast.error('Failed to generate image due to an unknown error.');
      }
    }
  };
  const onImageLoaded = () => {
    setLoading(false);
  };

  return (
    <IconGeneratorContext.Provider
      value={{
        prompt,
        setPrompt,
        imageUrl,
        setImageUrl,
        error,
        setError,
        handleSubmit,
        loading,
        onImageLoaded
      }}
    >
      {children}
    </IconGeneratorContext.Provider>
  );
};
