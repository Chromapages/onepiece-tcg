import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { sets, cards } from '@/lib/data';
import CardGrid from '@/components/CardGrid';

export async function generateStaticParams() {
  return sets.map(set => ({ id: set.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const set = sets.find(s => s.id === id);
  if (!set) return { title: 'Set Not Found' };
  return {
    title: `${set.name} | One Piece TCG`,
    description: set.description,
  };
}

export default async function SetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const set = sets.find(s => s.id === id);

  if (!set) notFound();

  const setCards = cards.filter(c => c.set === id);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Link href="/sets" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} />
        Back to Sets
      </Link>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-48 shrink-0">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-[#1a1a2e]">
            <img
              src={set.imageUrl}
              alt={set.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-white">{set.name}</h1>
          <p className="text-zinc-400">{set.description}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="text-zinc-500">Total Cards:</span>{' '}
              <span className="text-white font-medium">{set.totalCards}</span>
            </div>
            <div>
              <span className="text-zinc-500">Release Date:</span>{' '}
              <span className="text-white font-medium">
                {new Date(set.releaseDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-zinc-500">Set ID:</span>{' '}
              <span className="text-white font-medium">{set.id}</span>
            </div>
          </div>
          <p className="text-zinc-400 text-sm">
            {setCards.length} card{setCards.length !== 1 ? 's' : ''} in database
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-4">Cards in {set.name}</h2>
        <CardGrid cards={setCards} />
      </div>
    </div>
  );
}