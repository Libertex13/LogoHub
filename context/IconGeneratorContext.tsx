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
    noun: 'aa',
    adjective: 'bb',
    color: 'cc',
    model: 'aa',
    style: 'aa'
  });
  const [imageUrl, setImageUrl] = useState<string>(
    'https://oaidalleapiprodscus.blob.core.windows.net/private/org-h6mfhN51kT50HXCQGkQZwj6B/user-xxzBgZ3P9mjfdFbg6aSzDHIV/img-2lKySub4liv45tzO8ZCB2UwD.png?st=2023-11-13T16%3A09%3A11Z&se=2023-11-13T18%3A09%3A11Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-13T17%3A09%3A11Z&ske=2023-11-14T17%3A09%3A11Z&sks=b&skv=2021-08-06&sig=pbgx0K9Ix/Jw8/VCyyByZ0iwlkm0XxUvkBYMVsmAOTs%3D'
  );
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
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred');
      }
      setLoading(false);
    }
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
        loading
      }}
    >
      {children}
    </IconGeneratorContext.Provider>
  );
};
