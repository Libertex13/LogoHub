// components/auth/GoogleSignInButton.tsx
import { useAuth } from '@/context/AuthContext';

export function GoogleSignInButton() {
  const { signInWithGoogle } = useAuth();

  const handleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <button onClick={handleSignIn} type="button">
      Sign in with Google
    </button>
  );
}
