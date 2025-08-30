import React, { useState, useRef, useEffect } from 'react';

interface SortMenuProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { value: 'price-asc', label: 'Precio min-max' },
  { value: 'price-desc', label: 'Precio max-min' },
  { value: 'name-asc', label: 'Nombre A-Z' },
  { value: 'name-desc', label: 'Nombre Z-A' },
];

export default function SortMenuComponent({ value, onChange }: SortMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white flex items-center gap-2 shadow-sm hover:bg-gray-50"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Ordenar por
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
          <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {sortOptions.map(opt => (
            <button
              key={opt.value}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${value === opt.value ? 'bg-gray-100 font-semibold' : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              role="menuitem"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
