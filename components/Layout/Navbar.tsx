//components\Layout\Navbar.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, credits } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="flex mx-12 justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:cursor-pointer">
          <Image src="/LogoHubLogo.png" alt="Logo" width="50" height="50" />
          <div className="text-lg font-semibold">LogoHub</div>
        </Link>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {/* Icon with three lines (hamburger icon) */}
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div
          className={`absolute top-16 right-0 mt-2 w-fit bg-indigo-600 p-2 rounded-lg gap-4 shadow-md md:shadow-none md:bg-transparent md:p-0 md:rounded-none md:static md:flex ${
            isOpen ? 'flex flex-col gap-2' : 'hidden'
          }`}
        >
          <Link href="/">Home</Link>
          <Link href="/credits">Credits: {credits} </Link>
          {user ? (
            <>
              <Link href="/myLogos">MyLogos</Link>
              <Link href="/login">Sign out</Link>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
