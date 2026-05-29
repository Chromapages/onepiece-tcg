'use client';

import Link from 'next/link';
import { Card } from '@/lib/types';
import { clsx } from 'clsx';

const colorMap: Record<string, string> = {
  Red: 'border-red-500',
  Blue: 'border-blue-500',
  Green: 'border-green-500',
  Black: 'border-zinc-700',
  Yellow: 'border-yellow-500',
};

const rarityBadge: Record<string, string> = {
  Leader: 'bg-purple-600',
  SEC: 'bg-amber-500',
  SP: 'bg-pink-500',
  SR: 'bg-orange-500',
  R: 'bg-blue-500',
  UC: 'bg-zinc-500',
  C: 'bg-zinc-700',
};

export default function CardCard({ card }: { card: Card }) {
  return (
    <Link href={`/cards/${card.id}`}>
      <div
        className={clsx(
          'bg-[#13131f] rounded-lg overflow-hidden border-l-4 hover:scale-105 transition-transform duration-200 cursor-pointer',
          colorMap[card.color] || 'border-zinc-600'
        )}
      >
        <div className="relative aspect-[2.5/3.5] bg-[#1a1a2e]">
          <img
            src={card.imageUrl}
            alt={card.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-3 space-y-1">
          <p className="text-white text-sm font-semibold truncate">{card.name}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded bg-[#1e1e2e] text-zinc-300">
              {card.type}
            </span>
            {card.cost > 0 && (
              <span className="text-xs font-bold text-amber-400">{card.cost}&#9733;</span>
            )}
            <span
              className={clsx(
                'text-xs px-1.5 py-0.5 rounded text-white ml-auto',
                rarityBadge[card.rarity]
              )}
            >
              {card.rarity}
            </span>
          </div>
          {card.power !== undefined && (
            <p className="text-xs text-zinc-400">
              Power: <span className="text-white">{card.power.toLocaleString()}</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}