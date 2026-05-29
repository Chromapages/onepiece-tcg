/* eslint-disable @typescript-eslint/no-explicit-any */
import cardsJson from '../data/cards.json';
import setsJson from '../data/sets.json';
import { Card, Set } from './types';
import { z } from 'zod';

// ─── Zod Schemas — fail fast on malformed data ───────────────────────────────

const CardColorSchema = z.enum(['Red', 'Blue', 'Green', 'Black', 'Yellow']);
const CardTypeSchema = z.enum(['Character', 'Event', 'Stage', 'Leader']);
const RaritySchema = z.enum(['Leader', 'SEC', 'SP', 'SR', 'R', 'UC', 'C']);

export const CardSchema: z.ZodType<Card> = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: CardTypeSchema,
  color: CardColorSchema,
  cost: z.number().int().min(0).max(15),
  power: z.number().int().min(0).optional(),
  counter: z.number().int().min(0).optional(),
  rarity: RaritySchema,
  text: z.string(),
  trigger: z.string().optional(),
  set: z.string().min(1),
  setName: z.string().min(1),
  character: z.string().optional(),
  imageUrl: z.string().url(),
  featured: z.boolean().optional(),
});

export const SetSchema: z.ZodType<Set> = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  releaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  totalCards: z.number().int().positive(),
  description: z.string(),
  imageUrl: z.string().url(),
});

// ─── Validated Exports — throws at import time if data is bad ─────────────────

const cardResults = CardSchema.array().safeParse(cardsJson);
if (!cardResults.success) {
  const firstError = cardResults.error.issues[0];
  throw new Error(
    `Invalid card data at "${firstError.path.join('.')}": ${firstError.message}`
  );
}
export const cards: Card[] = cardResults.data;

const setResults = SetSchema.array().safeParse(setsJson);
if (!setResults.success) {
  const firstError = setResults.error.issues[0];
  throw new Error(
    `Invalid set data at "${firstError.path.join('.')}": ${firstError.message}`
  );
}
export const sets: Set[] = setResults.data;

// ─── Derived helpers ───────────────────────────────────────────────────────────

export const featuredCards = cards.filter(c => c.featured);
export const setsMap = new Map(sets.map(s => [s.id, s]));
