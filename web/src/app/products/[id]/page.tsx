"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import LoadingSpinner from '../../../core/components/LoadingSpinner';

export default function ProductShowPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`http://localhost:3001/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setError('');
      })
      .catch(err => {
        setError('No se pudo cargar el producto');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return <p className="text-gray-500">Producto no encontrado</p>;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-4 flex flex-col gap-2">
        <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">Regresar a inicio</Link>
        <Link href="/products" className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold w-fit">Productos</Link>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col sm:flex-row gap-12 items-center">
        <img src={product.image} alt={product.name} className="w-80 h-80 object-contain rounded-lg shadow" />
        <div className="flex-1 flex flex-col justify-center items-start gap-4 w-full">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <span className="relative group">
              <button
                type="button"
                className="p-2 text-pink-500 hover:text-pink-600 focus:outline-none cursor-pointer"
                aria-label="Agregar a favoritos"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z" />
                </svg>
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">Agregar a favoritos</span>
            </span>
          </div>
          <div className="text-blue-600 text-2xl font-semibold">${product.price?.toFixed(2)}</div>
        </div>
      </div>
    </main>
  );
}
