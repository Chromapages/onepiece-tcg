export type CardType = 'Character' | 'Event' | 'Stage' | 'Leader';
export type CardColor = 'Red' | 'Blue' | 'Green' | 'Black' | 'Yellow';
export type Rarity = 'Leader' | 'SEC' | 'SP' | 'SR' | 'R' | 'UC' | 'C';

export interface Card {
  id: string;
  name: string;
  type: CardType;
  color: CardColor;
  cost: number;
  power?: number;
  counter?: number;
  rarity: Rarity;
  text: string;
  trigger?: string;
  set: string;
  setName: string;
  character?: string;
  imageUrl: string;
  featured?: boolean;
}

export interface Set {
  id: string;
  name: string;
  releaseDate: string;
  totalCards: number;
  description: string;
  imageUrl: string;
}