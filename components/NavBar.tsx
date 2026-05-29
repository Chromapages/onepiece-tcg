'use client';

import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-[#0a0a12] border-b border-[#1e1e2e] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          One Piece TCG
        </Link>
        <div className="flex gap-6">
          <Link href="/cards" className="text-zinc-400 hover:text-white transition-colors">
            Cards
          </Link>
          <Link href="/sets" className="text-zinc-400 hover:text-white transition-colors">
            Sets
          </Link>
        </div>
      </div>
    </nav>
  );
}