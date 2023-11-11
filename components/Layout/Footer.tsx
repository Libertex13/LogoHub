export default function Footer() {
  return (
    <footer className="bg-indigo-600 text-white text-center p-4 mt-8">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} LogoHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
