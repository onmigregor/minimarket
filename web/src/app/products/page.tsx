"use client";

import { useState, useEffect } from 'react';
import ListGridComponent from '../../components/products/ListGridComponent';
import FilterComponent from '../../components/products/FilterComponent';
import LoadingSpinner from '../../core/components/LoadingSpinner';
import PaginationComponent from '../../components/products/PaginationComponent';

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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [pageInfo, setPageInfo] = useState({ page: 1, limit: 8, total: 0, pages: 1 });

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
      params.push(`page=${page}`);
      params.push(`limit=${limit}`);
      url += params.join('&');
      if (!params.length) url = 'http://localhost:3001/api/products';
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setProducts(data.items || []);
          setPageInfo(data.pageInfo || { page: 1, limit, total: 0, pages: 1 });
          setError('');
        })
        .catch(err => {
          setError('Error: ' + (err?.message || 'No se pudo conectar'));
        })
        .finally(() => setLoading(false));
    }, 500);
    return () => clearTimeout(timer);
  }, [debouncedSearch, available, sort, page, limit]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Productos</h2>
      <FilterComponent
        search={search}
        onSearchChange={setSearch}
        available={available}
        onAvailableChange={setAvailable}
        sort={sort}
        onSortChange={setSort}
        availabilityOptions={availabilityOptions}
      />
    {loading && <LoadingSpinner />}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && <>
        <ListGridComponent products={products} />
        <PaginationComponent
          page={pageInfo.page}
          pages={pageInfo.pages}
          onPageChange={setPage}
          limit={pageInfo.limit}
          onLimitChange={l => { setLimit(l); setPage(1); }}
          total={pageInfo.total}
        />
      </>}
    </main>
  );
}
