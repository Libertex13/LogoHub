//pages\index.tsx
import { Inter } from 'next/font/google';
import IconGeneratorForm from '@/components/Form/IconGeneratorForm';
import Icon from '@/components/IconLayout';
import { useAuth } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

const Home: React.FC = () => {
  const { user, credits } = useAuth();

  return (
    <main className={`min-h-screen p-8 md:px-16 lg:px-24 ${inter.className}`}>
      {user ? (
        <p className="flex justify-center gap-4 px-4">
          Welcome, {user.email}! You have {credits} credits left.
        </p>
      ) : (
        <p className="flex justify-center gap-4 px-4">Welcome, Guest!</p>
      )}
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
