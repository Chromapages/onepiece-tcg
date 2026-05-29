'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CardGrid from '@/components/CardGrid';
import FilterSidebar from '@/components/FilterSidebar';
import SearchBar from '@/components/SearchBar';
import { cards } from '@/lib/data';
import { sets } from '@/lib/data';
import { CardType, CardColor, Rarity } from '@/lib/types';

function CardsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [type, setType] = useState<CardType | undefined>(
    (searchParams.get('type') as CardType) || undefined
  );
  const [color, setColor] = useState<CardColor | undefined>(
    (searchParams.get('color') as CardColor) || undefined
  );
  const [character, setCharacter] = useState<string | undefined>(
    searchParams.get('character') || undefined
  );
  const [rarity, setRarity] = useState<Rarity | undefined>(
    (searchParams.get('rarity') as Rarity) || undefined
  );
  const [setId, setSetId] = useState<string | undefined>(
    searchParams.get('set') || undefined
  );
  const [cost, setCost] = useState<number | undefined>(
    searchParams.get('cost') ? Number(searchParams.get('cost')) : undefined
  );

  const characters = useMemo(() => {
    const chars = cards.map(c => c.character).filter(Boolean) as string[];
    return [...new Set(chars)].sort();
  }, []);

  const setOptions = useMemo(() => sets.map(s => s.id), []);

  const handleFilterChange = (key: string, value: string | number | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === undefined || value === '') {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
    router.push(`/cards?${params.toString()}`, { scroll: false });

    switch (key) {
      case 'search': setSearch(String(value || '')); break;
      case 'type': setType(value as CardType || undefined); break;
      case 'color': setColor(value as CardColor || undefined); break;
      case 'character': setCharacter(String(value) || undefined); break;
      case 'rarity': setRarity(value as Rarity || undefined); break;
      case 'set': setSetId(String(value) || undefined); break;
      case 'cost': setCost(value as number || undefined); break;
    }
  };

  const handleClearAll = () => {
    setSearch('');
    setType(undefined);
    setColor(undefined);
    setCharacter(undefined);
    setRarity(undefined);
    setSetId(undefined);
    setCost(undefined);
    router.push('/cards', { scroll: false });
  };

  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      if (search && !card.name.toLowerCase().includes(search.toLowerCase()) && !card.text.toLowerCase().includes(search.toLowerCase())) return false;
      if (type && card.type !== type) return false;
      if (color && card.color !== color) return false;
      if (character && card.character !== character) return false;
      if (rarity && card.rarity !== rarity) return false;
      if (setId && card.set !== setId) return false;
      if (cost !== undefined && card.cost !== cost) return false;
      return true;
    });
  }, [search, type, color, character, rarity, setId, cost]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64 shrink-0">
          <FilterSidebar
            filters={{ type, color, character, set: setId, cost, rarity }}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
            characters={characters}
            sets={setOptions}
          />
        </aside>
        <div className="flex-1">
          <div className="mb-6">
            <SearchBar value={search} onChange={v => handleFilterChange('search', v)} />
          </div>
          <div className="mb-4 text-zinc-400 text-sm">
            {filteredCards.length} card{filteredCards.length !== 1 ? 's' : ''} found
          </div>
          <CardGrid cards={filteredCards} />
        </div>
      </div>
    </div>
  );
}

export default function CardsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-6 py-8"><div className="animate-pulse text-zinc-400">Loading cards...</div></div>}>
      <CardsContent />
    </Suspense>
  );
}