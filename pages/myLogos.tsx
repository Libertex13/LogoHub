//pages\myLogos.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tab } from '@headlessui/react';
import Image from 'next/image';

export default function MyLogos() {
  const { fetchSavedImages, savedImages } = useAuth();
  const [selectedModel, setSelectedModel] = useState('all');

  useEffect(() => {
    fetchSavedImages();
  }, [fetchSavedImages]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-8  p-16">
      {/* Tab component for model selection */}
      <Tab.Group>
        <Tab.List className="flex gap-8 p-1 space-x-1 bg-indigo-600/20 rounded-xl">
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 px-2.5 text-sm leading-5 font-medium text-white rounded-lg
              ${
                selected
                  ? 'bg-indigo-500 shadow'
                  : 'text-indigo-700 hover:bg-white/[0.12] hover:text-white'
              }
              focus:outline-none focus:ring-2 ring-offset-2 ring-offset-indigo-400 ring-white ring-opacity-60`
            }
            onClick={() => setSelectedModel('all')}
          >
            All Models
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 px-2.5  text-sm leading-5 font-medium text-white rounded-lg
              ${
                selected
                  ? 'bg-indigo-500 shadow'
                  : 'text-indigo-700 hover:bg-white/[0.12] hover:text-white'
              }
              focus:outline-none focus:ring-2 ring-offset-2 ring-offset-indigo-400 ring-white ring-opacity-60`
            }
            onClick={() => setSelectedModel('dall-e-2')}
          >
            Dall-e 2
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 px-2.5  text-sm leading-5 font-medium text-white rounded-lg
              ${
                selected
                  ? 'bg-indigo-500 shadow'
                  : 'text-indigo-700 hover:bg-white/[0.12] hover:text-white'
              }
              focus:outline-none focus:ring-2 ring-offset-2 ring-offset-indigo-400 ring-white ring-opacity-60`
            }
            onClick={() => setSelectedModel('dall-e-3')}
          >
            Dall-e 3
          </Tab>
        </Tab.List>
      </Tab.Group>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-16">
        {savedImages
          .filter(
            (image) => selectedModel === 'all' || image.model === selectedModel
          )
          .map((image, index) => {
            // Parse the prompt string into an object
            const promptDetails = JSON.parse(image.prompt);

            return (
              <div key={index} className="w-full group">
                <div className="rounded-lg min-w-fit overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative">
                  <Image
                    src={image.image_url}
                    alt={`Saved image ${index + 1}`}
                    width={500}
                    height={500}
                    style={{ aspectRatio: '1 / 1' }}
                    priority
                  />
                  <div className="absolute inset-0 cursor-pointer bg-indigo-900 bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                    <div className="text-white text-lg font-semibold text-center">
                      {/* Display prompt details */}
                      <p>Noun: {promptDetails.noun}</p>
                      <p>Adjective: {promptDetails.adjective}</p>
                      <p>Color: {promptDetails.color}</p>
                      <p>Model: {promptDetails.model}</p>
                      <p>Style: {promptDetails.style}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
