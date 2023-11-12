// components/auth/GoogleSignInButton.tsx
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

export function GoogleSignInButton() {
  const { signInWithGoogle } = useAuth();

  const handleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <button
      className="px-4 py-2 col-span-2 justify-center items-center border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
      onClick={handleSignIn}
    >
      <Image
        width={20}
        height={20}
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span>Login with Google</span>
    </button>
  );
}
