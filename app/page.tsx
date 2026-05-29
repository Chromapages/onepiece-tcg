import Link from 'next/link';
import Image from 'next/image';
import CardGrid from '@/components/CardGrid';
import SetCard from '@/components/SetCard';
import { cards, sets } from '@/lib/data';

export default function HomePage() {
  const featuredCards = cards.filter(c => c.featured);
  const previewSets = sets.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0f0f1a] to-[#0a0a12] py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            One Piece TCG Database
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-8">
            Explore every card from Romance Dawn to Pillars of Strength.
            Filter by color, type, character, and more.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/cards"
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-colors"
            >
              Browse Cards
            </Link>
            <Link
              href="/sets"
              className="px-6 py-3 bg-[#1e1e2e] hover:bg-[#2a2a3e] text-white font-semibold rounded-lg transition-colors"
            >
              View Sets
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cards */}
      <section className="px-6 py-16 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Featured Cards</h2>
          <Link href="/cards" className="text-red-400 hover:text-red-300 text-sm font-medium">
            View All →
          </Link>
        </div>
        <CardGrid cards={featuredCards} />
      </section>

      {/* Sets */}
      <section className="px-6 py-16 bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Sets</h2>
            <Link href="/sets" className="text-red-400 hover:text-red-300 text-sm font-medium">
              All Sets →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {previewSets.map(set => (
              <SetCard key={set.id} set={set} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}