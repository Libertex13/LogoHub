//components\Layout\Navbar.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/LogoHubLogo.png" alt="Logo" width="50" height="50" />
          <div className="text-lg font-semibold">LogoHub</div>
        </div>
        <div className="flex gap-8">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="#" className="hover:text-gray-300">
            MyLogos
          </Link>
          <Link href="/login" className="hover:text-gray-300">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
