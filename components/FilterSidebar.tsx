'use client';

import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { CardType, CardColor, Rarity } from '@/lib/types';

interface FilterSidebarProps {
  filters: {
    type?: CardType;
    color?: CardColor;
    character?: string;
    set?: string;
    cost?: number;
    rarity?: Rarity;
  };
  onFilterChange: (key: string, value: string | number | undefined) => void;
  onClearAll: () => void;
  characters: string[];
  sets: string[];
}

const cardTypes: CardType[] = ['Character', 'Event', 'Stage', 'Leader'];
const cardColors: CardColor[] = ['Red', 'Blue', 'Green', 'Black', 'Yellow'];
const rarities: Rarity[] = ['Leader', 'SEC', 'SP', 'SR', 'R', 'UC', 'C'];
const costs = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function FilterSidebar({
  filters,
  onFilterChange,
  onClearAll,
  characters,
  sets,
}: FilterSidebarProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    type: true,
    color: true,
    character: false,
    set: false,
    cost: false,
    rarity: false,
  });

  const toggleGroup = (group: string) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <aside className="bg-[#0f0f1a] rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold">Filters</h2>
        {activeFiltersCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
          >
            <X size={12} />
            Clear All
          </button>
        )}
      </div>

      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.type && (
            <button
              onClick={() => onFilterChange('type', undefined)}
              className="text-xs px-2 py-1 rounded bg-purple-600/30 text-purple-300 flex items-center gap-1"
            >
              {filters.type}
              <X size={10} />
            </button>
          )}
          {filters.color && (
            <button
              onClick={() => onFilterChange('color', undefined)}
              className="text-xs px-2 py-1 rounded bg-blue-600/30 text-blue-300 flex items-center gap-1"
            >
              {filters.color}
              <X size={10} />
            </button>
          )}
          {filters.character && (
            <button
              onClick={() => onFilterChange('character', undefined)}
              className="text-xs px-2 py-1 rounded bg-green-600/30 text-green-300 flex items-center gap-1"
            >
              {filters.character}
              <X size={10} />
            </button>
          )}
          {filters.rarity && (
            <button
              onClick={() => onFilterChange('rarity', undefined)}
              className="text-xs px-2 py-1 rounded bg-amber-600/30 text-amber-300 flex items-center gap-1"
            >
              {filters.rarity}
              <X size={10} />
            </button>
          )}
        </div>
      )}

      {/* Card Type */}
      <FilterGroup
        label="Card Type"
        open={openGroups.type}
        onToggle={() => toggleGroup('type')}
      >
        {cardTypes.map(type => (
          <FilterButton
            key={type}
            label={type}
            active={filters.type === type}
            onClick={() => onFilterChange('type', filters.type === type ? undefined : type)}
          />
        ))}
      </FilterGroup>

      {/* Color */}
      <FilterGroup
        label="Color"
        open={openGroups.color}
        onToggle={() => toggleGroup('color')}
      >
        {cardColors.map(color => (
          <FilterButton
            key={color}
            label={color}
            active={filters.color === color}
            onClick={() => onFilterChange('color', filters.color === color ? undefined : color)}
            colorDot={color.toLowerCase()}
          />
        ))}
      </FilterGroup>

      {/* Character */}
      <FilterGroup
        label="Character"
        open={openGroups.character}
        onToggle={() => toggleGroup('character')}
      >
        {characters.map(char => (
          <FilterButton
            key={char}
            label={char}
            active={filters.character === char}
            onClick={() => onFilterChange('character', filters.character === char ? undefined : char)}
          />
        ))}
      </FilterGroup>

      {/* Set */}
      <FilterGroup
        label="Set"
        open={openGroups.set}
        onToggle={() => toggleGroup('set')}
      >
        {sets.map(set => (
          <FilterButton
            key={set}
            label={set}
            active={filters.set === set}
            onClick={() => onFilterChange('set', filters.set === set ? undefined : set)}
          />
        ))}
      </FilterGroup>

      {/* Cost */}
      <FilterGroup
        label="Cost"
        open={openGroups.cost}
        onToggle={() => toggleGroup('cost')}
      >
        <div className="flex flex-wrap gap-1">
          {costs.map(cost => (
            <button
              key={cost}
              onClick={() => onFilterChange('cost', filters.cost === cost ? undefined : cost)}
              className={clsx(
                'w-8 h-8 rounded text-sm font-semibold transition-colors',
                filters.cost === cost
                  ? 'bg-amber-600 text-white'
                  : 'bg-[#1e1e2e] text-zinc-400 hover:bg-[#2a2a3e]'
              )}
            >
              {cost}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Rarity */}
      <FilterGroup
        label="Rarity"
        open={openGroups.rarity}
        onToggle={() => toggleGroup('rarity')}
      >
        {rarities.map(rarity => (
          <FilterButton
            key={rarity}
            label={rarity}
            active={filters.rarity === rarity}
            onClick={() => onFilterChange('rarity', filters.rarity === rarity ? undefined : rarity)}
          />
        ))}
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#1e1e2e] pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-zinc-300 hover:text-white mb-2"
      >
        <span className="text-sm font-medium">{label}</span>
        <ChevronDown
          size={14}
          className={clsx('transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && <div className="flex flex-col gap-1">{children}</div>}
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
  colorDot,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  colorDot?: string;
}) {
  const dotColors: Record<string, string> = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    black: 'bg-zinc-600',
    yellow: 'bg-yellow-500',
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        'text-xs px-2 py-1 rounded text-left transition-colors flex items-center gap-2',
        active
          ? 'bg-[#3a3a5e] text-white'
          : 'text-zinc-400 hover:bg-[#1e1e2e] hover:text-zinc-200'
      )}
    >
      {colorDot && <span className={clsx('w-2 h-2 rounded-full', dotColors[colorDot])} />}
      {label}
    </button>
  );
}