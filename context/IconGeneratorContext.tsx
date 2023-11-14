//context\IconGeneratorContext.tsx
import React, { createContext, useState } from 'react';
import {
  IconGeneratorContextProps,
  IconGeneratorProviderProps
} from '@/types/types';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    const description = `Design an ${updatedPrompt.adjective} ${updatedPrompt.noun}-themed icon. Use a ${updatedPrompt.color} color palette, styled in a ${updatedPrompt.style} manner. The icon should be visually striking and easily recognizable, suitable for digital interfaces (.ico format). The design should emphasize visual recognizability and convey the adjective of ${updatedPrompt.adjective} effectively, making it instantly recognizable at a glance.`;

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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred');
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
