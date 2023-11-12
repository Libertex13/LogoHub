//components\IconLayout.tsx
import { IconGeneratorContext } from '@/context/IconGeneratorContext';
import React, { useContext } from 'react';
import Image from 'next/image';

export default function Icon() {
  const context = useContext(IconGeneratorContext);
  const imageUrl = context?.imageUrl ?? '';
  const error = context?.error ?? '';

  return (
    <>
      {imageUrl && (
        <div className="flex justify-center border min-h-full border-indigo-600 rounded-md p-4">
          <Image src={imageUrl} alt="Generated" width="500" height="500" />
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </>
  );
}
