import type { Category } from '../types';

const FILTERS = ['All', 'R16', 'R8', 'R4'] as const;

type FilterValue = (typeof FILTERS)[number];

type FiltersProps = {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
};

export type { FilterValue };

export default function Filters({ active, onChange }: FiltersProps) {
  return (
    <nav className="filters" aria-label="Category">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          className={filter === active ? 'is-active' : undefined}
          aria-pressed={filter === active}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </nav>
  );
}

export function matchesCategory(category: Category, filter: FilterValue) {
  return filter === 'All' || category === filter;
}
