"use client";

import { useState, useEffect } from 'react';
import ListGridComponent from '../../components/products/ListGridComponent';
import SearchInputComponent from '../../components/products/SearchInputComponent';
import SortMenuComponent from '../../components/products/SortMenuComponent';

export type Product = {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image: string;
};

const availabilityOptions = [
  { value: '', label: 'Todos' },
  { value: 'true', label: 'En stock' },
  { value: 'false', label: 'Sin stock' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [available, setAvailable] = useState('');
  const [sort, setSort] = useState('name-asc');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let url = `http://localhost:3001/api/products?`;
      const params = [];
      if (debouncedSearch.trim()) params.push(`search=${encodeURIComponent(debouncedSearch)}`);
      if (available) params.push(`available=${available}`);
      if (sort) {
        if (sort === 'price-asc') {
          params.push('sort=price');
          params.push('order=asc');
        } else if (sort === 'price-desc') {
          params.push('sort=price');
          params.push('order=desc');
        } else if (sort === 'name-asc') {
          params.push('sort=name');
          params.push('order=asc');
        } else if (sort === 'name-desc') {
          params.push('sort=name');
          params.push('order=desc');
        }
      }
      url += params.join('&');
      if (!params.length) url = 'http://localhost:3001/api/products';
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setProducts(data.items || []);
          setError('');
        })
        .catch(err => {
          setError('Error: ' + (err?.message || 'No se pudo conectar'));
        })
        .finally(() => setLoading(false));
    }, 500);
    return () => clearTimeout(timer);
  }, [debouncedSearch, available, sort]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Productos</h2>
      <div className="flex flex-row justify-between py-8">
        {/* Bloque 1: input y selector */}
        <div className="flex gap-4 items-center">
          <div className="w-full">
            <SearchInputComponent value={search} onChange={setSearch} />
          </div>
          <div>
            <select
              value={available}
              onChange={e => setAvailable(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {availabilityOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Bloque 2: botón de ordenar y texto azul */}
        <div className="flex items-center gap-2">
          <span className="text-blue-600 text-sm font-medium">
            {(() => {
              switch (sort) {
                case 'price-asc': return 'Precio min-max';
                case 'price-desc': return 'Precio max-min';
                case 'name-asc': return 'Nombre A-Z';
                case 'name-desc': return 'Nombre Z-A';
                default: return '';
              }
            })()}
          </span>
          <SortMenuComponent value={sort} onChange={setSort} />
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && <ListGridComponent products={products} />}
    </main>
  );
}
