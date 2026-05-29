'use client';

import Link from 'next/link';
import { Set } from '@/lib/types';
import { clsx } from 'clsx';

export default function SetCard({ set }: { set: Set }) {
  return (
    <Link href={`/sets/${set.id}`}>
      <div className="bg-[#13131f] rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer">
        <div className="relative aspect-square bg-[#1a1a2e]">
          <img
            src={set.imageUrl}
            alt={set.name}
            className="w-full h-full object-cover opacity-80"
            loading="lazy"
          />
        </div>
        <div className="p-4 space-y-1">
          <p className="text-white text-base font-semibold">{set.name}</p>
          <p className="text-zinc-400 text-sm">
            {set.totalCards} cards &middot; {new Date(set.releaseDate).getFullYear()}
          </p>
          <p className="text-zinc-500 text-xs line-clamp-2 mt-1">{set.description}</p>
        </div>
      </div>
    </Link>
  );
}