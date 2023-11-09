//context\IconGeneratorContext.tsx
import React, { createContext, useState } from 'react';
import { IconGeneratorContextProps, IconGeneratorProviderProps } from '@/types/types';

export const IconGeneratorContext = createContext<IconGeneratorContextProps | null>(null);


export const IconGeneratorProvider: React.FC<IconGeneratorProviderProps> = ({ children }) => {
  const [prompt, setPrompt] = useState({
    noun: '',
    adjective: '',
    color: '',
    model: '',
    style: ''
  });
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');


 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

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

  const description = `${updatedPrompt.adjective} ${updatedPrompt.noun} in ${updatedPrompt.color} color, style: ${updatedPrompt.style} icon, .ico`;
  
  try {
    const response = await fetch('/api/dalle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: description , model: updatedPrompt.model}), // Send as string
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

  return (
    <IconGeneratorContext.Provider value={{ prompt, setPrompt, imageUrl, setImageUrl, error, setError, handleSubmit }}>
      {children}
    </IconGeneratorContext.Provider>
  );
};