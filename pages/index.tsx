//pages\index.tsx
import { Inter } from 'next/font/google';
import IconGeneratorForm from '@/components/Form/IconGeneratorForm';
import Icon from '@/components/IconLayout';
const inter = Inter({ subsets: ['latin'] });

const Home: React.FC = () => {
  return (
    <main className={` min-h-screen  p-4 md:p-16 lg:p-24 ${inter.className}`}>
      <div className="flex flex-col justify-center gap-4 xl:flex-row overflow-auto min-h-full p-4">
        {/* Form to construct prompt */}
        <IconGeneratorForm />
        {/* Display results */}
        <Icon />
      </div>
    </main>
  );
};

export default Home;
