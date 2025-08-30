import React from 'react';
import SearchInputComponent from './SearchInputComponent';
import SortMenuComponent from './SortMenuComponent';
import AvailabilitySelectorComponent from './AvailabilitySelectorComponent';

interface FilterComponentProps {
  search: string;
  onSearchChange: (value: string) => void;
  available: string;
  onAvailableChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  availabilityOptions: { value: string; label: string }[];
}

export default function FilterComponent({
  search,
  onSearchChange,
  available,
  onAvailableChange,
  sort,
  onSortChange,
  availabilityOptions,
}: FilterComponentProps) {
  return (
    <div className="flex flex-row justify-between py-8">
      {/* Bloque 1: input y selector */}
      <div className="flex gap-4 items-center">
        <div className="w-full">
          <SearchInputComponent value={search} onChange={onSearchChange} />
        </div>
        <div>
          <AvailabilitySelectorComponent
            value={available}
            onChange={onAvailableChange}
            options={availabilityOptions}
          />
        </div>
      </div>
      {/* Bloque 2: botón de ordenar y texto azul */}
      <div className="flex items-center gap-2">
        <SortMenuComponent value={sort} onChange={onSortChange} />
      </div>
    </div>
  );
}
