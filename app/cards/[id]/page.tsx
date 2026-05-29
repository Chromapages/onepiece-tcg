import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cards } from '@/lib/data';
import CardGrid from '@/components/CardGrid';
import { clsx } from 'clsx';

const colorMap: Record<string, string> = {
  Red: 'text-red-500',
  Blue: 'text-blue-500',
  Green: 'text-green-500',
  Black: 'text-zinc-500',
  Yellow: 'text-yellow-500',
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

export async function generateStaticParams() {
  return cards.map(card => ({ id: card.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = cards.find(c => c.id === id);
  if (!card) return { title: 'Card Not Found' };
  return {
    title: `${card.name} | One Piece TCG`,
    description: card.text,
  };
}

export default async function CardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = cards.find(c => c.id === id);

  if (!card) notFound();

  const relatedCards = cards
    .filter(c => c.id !== card.id && (c.character === card.character || c.set === card.set))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Link href="/cards" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} />
        Back to Cards
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card Image */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md aspect-[2.5/3.5] rounded-xl overflow-hidden bg-[#1a1a2e]">
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Card Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{card.name}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={clsx('text-lg font-semibold', colorMap[card.color])}>
                {card.color}
              </span>
              <span className="text-zinc-500">&middot;</span>
              <span className="px-2 py-1 rounded bg-[#1e1e2e] text-zinc-300 text-sm">
                {card.type}
              </span>
              <span
                className={clsx('px-2 py-1 rounded text-white text-sm', rarityBadge[card.rarity])}
              >
                {card.rarity}
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox label="Cost" value={card.cost > 0 ? `${card.cost} ★` : '—'} />
            {card.power !== undefined && (
              <StatBox label="Power" value={card.power.toLocaleString()} />
            )}
            {card.counter !== undefined && (
              <StatBox label="Counter" value={card.counter.toLocaleString()} />
            )}
            <StatBox label="Set" value={card.set} />
          </div>

          {/* Character/Ability Info */}
          {card.character && (
            <div>
              <p className="text-zinc-400 text-sm">Character</p>
              <p className="text-white">{card.character}</p>
            </div>
          )}

          {/* Ability Text */}
          <div className="bg-[#13131f] rounded-xl p-4">
            <p className="text-zinc-400 text-sm mb-2">Ability</p>
            <p className="text-zinc-200 leading-relaxed">{card.text}</p>
            {card.trigger && (
              <p className="mt-2 text-amber-400 text-sm font-medium">
                Trigger: {card.trigger}
              </p>
            )}
          </div>

          {/* Set Info */}
          <div className="bg-[#13131f] rounded-xl p-4">
            <p className="text-zinc-400 text-sm mb-1">Set</p>
            <Link
              href={`/sets/${card.set}`}
              className="text-white hover:text-red-400 transition-colors"
            >
              {card.setName} ({card.set})
            </Link>
          </div>
        </div>
      </div>

      {/* Related Cards */}
      {relatedCards.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Cards</h2>
          <CardGrid cards={relatedCards} />
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#13131f] rounded-lg p-3">
      <p className="text-zinc-500 text-xs mb-1">{label}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  );
}