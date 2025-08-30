import React from 'react';

interface PaginationProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
  total: number;
  limits?: number[];
}

export default function PaginationComponent({ page, pages, onPageChange, limit, onLimitChange, total, limits }: PaginationProps) {
  const defaultLimits = [4, 8, 12, 16, 20];
  const pageLimits = limits && limits.length > 0 ? limits : defaultLimits;
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
      <div className="flex items-center gap-2">
        <span className="text-sm">Items por página:</span>
        <select
          value={limit}
          onChange={e => onLimitChange(Number(e.target.value))}
          className="px-2 py-1 border border-gray-300 rounded focus:outline-none"
        >
          {pageLimits.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <span className="text-xs text-gray-500 ml-2">Total: {total}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-2 py-1 border rounded disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          &lt;
        </button>
        <span className="text-sm">Página {page} de {pages}</span>
        <button
          className="px-2 py-1 border rounded disabled:opacity-50"
          disabled={page >= pages}
          onClick={() => onPageChange(page + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
