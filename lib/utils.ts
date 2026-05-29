import { Card, CardType, CardColor, Rarity } from './types';

export function filterCards(cards: Card[], filters: {
  search?: string;
  type?: CardType;
  color?: CardColor;
  character?: string;
  set?: string;
  cost?: number;
  rarity?: Rarity;
}): Card[] {
  return cards.filter(card => {
    if (filters.search && !card.name.toLowerCase().includes(filters.search.toLowerCase()) && !card.text.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.type && card.type !== filters.type) return false;
    if (filters.color && card.color !== filters.color) return false;
    if (filters.character && card.character !== filters.character) return false;
    if (filters.set && card.set !== filters.set) return false;
    if (filters.cost !== undefined && card.cost !== filters.cost) return false;
    if (filters.rarity && card.rarity !== filters.rarity) return false;
    return true;
  });
}

export function sortCards(cards: Card[], sortBy: 'name' | 'cost' | 'power' | 'rarity' = 'name'): Card[] {
  const rarityOrder: Record<Rarity, number> = { Leader: 0, SEC: 1, SP: 2, SR: 3, R: 4, UC: 5, C: 6 };
  return [...cards].sort((a, b) => {
    if (sortBy === 'rarity') return rarityOrder[a.rarity] - rarityOrder[b.rarity];
    if (sortBy === 'cost') return a.cost - b.cost;
    if (sortBy === 'power') return (b.power || 0) - (a.power || 0);
    return a.name.localeCompare(b.name);
  });
}