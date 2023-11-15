//components\IconLayout.tsx
import { IconGeneratorContext } from '@/context/IconGeneratorContext';
import React, { useContext } from 'react';
import Image from 'next/image';
import Spinner from './Spinner';
import { useAuth } from '@/context/AuthContext';

export default function Icon() {
  const { imageUrl, prompt, onImageLoaded, loading } =
    useContext(IconGeneratorContext) ?? {};
  const { saveImage } = useAuth();

  const handleSave = () => {
    if (imageUrl && prompt && prompt.model) {
      saveImage(imageUrl, prompt, prompt.model);
    }
  };

  return (
    <>
      {loading && <Spinner />} {/* Show spinner when loading */}
      {imageUrl && (
        <div className="relative flex justify-center border min-h-full border-indigo-600 rounded-md p-4">
          <div className="flex rounded-lg aspect-w-1 aspect-h-1 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <Image
              className="shadow-lg hover:shadow-2xl transition-shadow duration-300"
              onLoad={onImageLoaded}
              src={imageUrl}
              alt="Generated"
              width={500}
              height={500}
              style={{ aspectRatio: '1 / 1' }}
              priority
            />
          </div>
          {imageUrl && (
            <button
              onClick={handleSave}
              className="absolute bottom-0 right-0 mb-6 mr-6 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 z-10"
            >
              Save Image
            </button>
          )}
        </div>
      )}
    </>
  );
}
