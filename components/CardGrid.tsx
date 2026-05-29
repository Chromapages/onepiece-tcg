'use client';

import { Card } from '@/lib/types';
import CardCard from './CardCard';

export default function CardGrid({ cards, loading }: { cards: Card[]; loading?: boolean }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-[#13131f] rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-[2.5/3.5] bg-[#1e1e2e]" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-[#1e1e2e] rounded w-3/4" />
              <div className="h-3 bg-[#1e1e2e] rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-zinc-400 text-lg">No cards found matching your filters.</p>
        <p className="text-zinc-600 text-sm mt-2">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map(card => (
        <CardCard key={card.id} card={card} />
      ))}
    </div>
  );
}