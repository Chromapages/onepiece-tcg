/* eslint-disable @typescript-eslint/no-explicit-any */
import cardsJson from '../data/cards.json';
import setsJson from '../data/sets.json';
import { Card, Set } from './types';

export const cards = cardsJson as Card[];
export const sets = setsJson as Set[];