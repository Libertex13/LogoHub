//pages\index.tsx
import React, { useContext } from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import IconGeneratorForm from '@/components/IconGeneratorForm';
import { IconGeneratorContext } from '@/context/IconGeneratorContext';

const inter = Inter({ subsets: ['latin'] });


const Home: React.FC = () => {
  const context = useContext(IconGeneratorContext);

  if (!context) {
    return <div>Error: Context not found</div>;
  }

  const { imageUrl, error } = context;


  return (
     <main className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}>
      <h1>Generate Your Icon</h1>
     {/* Form to construct prompt*/}
     <IconGeneratorForm/>
      {/* Display results */}
      {imageUrl &&  <Image src={imageUrl} alt="Generated" width="100" height="100"/>}
      {error && <p>Error: {error}</p>}
    </main>
  );
}


export default Home;