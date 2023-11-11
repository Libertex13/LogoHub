// pages/login.tsx
import React from 'react';
import { GoogleSignInButton } from '@/components/Auth/GoogleSignInButton';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { user, signOut } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center p-16 gap-16">
      <div className="w-full max-w-sm space-y-10">
        <div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {user ? (
          <div>
            <p>Logged In as {user.email}</p>{' '}
            <button onClick={signOut}>Sign Out</button>
          </div>
        ) : (
          <GoogleSignInButton />
        )}
      </div>
    </main>
  );
}
