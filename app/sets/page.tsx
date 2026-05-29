import { Metadata } from 'next';
import SetCard from '@/components/SetCard';
import { sets } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sets | One Piece TCG',
  description: 'Browse all One Piece TCG sets',
};

export default function SetsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">All Sets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sets.map(set => (
          <SetCard key={set.id} set={set} />
        ))}
      </div>
    </div>
  );
}