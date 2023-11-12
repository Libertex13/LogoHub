// pages/login.tsx
import React from 'react';
import { GoogleSignInButton } from '@/components/Auth/GoogleSignInButton';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { user, signOut } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center p-16 gap-16">
      <div className="flex flex-col w-full max-w-sm space-y-10">
        <div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {user ? (
          <div className="flex flex-col justify-center gap-4">
            <p className="flex justify-center">Logged In as {user.email}</p>{' '}
            <button
              className="px-4 py-2 col-span-2 justify-center items-center border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
              onClick={signOut}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <GoogleSignInButton />
        )}
      </div>
    </main>
  );
}
