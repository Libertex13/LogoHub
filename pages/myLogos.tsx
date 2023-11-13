import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

export default function MyLogos() {
  const { fetchSavedImages, savedImages } = useAuth();

  useEffect(() => {
    fetchSavedImages();
  }, [fetchSavedImages]);

  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-16">
        {savedImages.map((image, index) => (
          <div key={index} className="w-full">
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <Image
                src={image.image_url}
                alt={`Saved image ${index + 1}`}
                width={500}
                height={500}
                style={{ aspectRatio: '1 / 1' }}
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
