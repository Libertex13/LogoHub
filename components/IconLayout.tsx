//components\IconLayout.tsx
import { IconGeneratorContext } from '@/context/IconGeneratorContext';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

export default function Icon() {
  const { imageUrl, prompt } = useContext(IconGeneratorContext) ?? {};
  const { saveImage, fetchSavedImages, savedImages } = useAuth();
  const [randomImage, setRandomImage] = useState('');
  const [isRandomImageSet, setIsRandomImageSet] = useState(false);

  useEffect(() => {
    fetchSavedImages();
  }, [fetchSavedImages]);

  useEffect(() => {
    if (!imageUrl && savedImages.length > 0 && !isRandomImageSet) {
      // Pick a random image from savedImages
      const randomIndex = Math.floor(Math.random() * savedImages.length);
      setRandomImage(savedImages[randomIndex].image_url);
      setIsRandomImageSet(true); // Ensure the random image is set only once
    }
  }, [imageUrl, savedImages, isRandomImageSet]);

  const handleSave = () => {
    if (imageUrl && prompt && prompt.model) {
      saveImage(imageUrl, prompt, prompt.model);
    }
  };

  const imageToDisplay = imageUrl || randomImage;

  return (
    <>
      {imageToDisplay && (
        <div className="relative flex justify-center border min-h-full border-indigo-600 rounded-md p-4">
          <Image
            className="shadow-lg hover:shadow-2xl transition-shadow duration-300"
            src={imageToDisplay}
            alt="Generated"
            width={500}
            height={500}
            priority
          />
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
