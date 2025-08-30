"use client";
import { useEffect, useState } from 'react';
import { getTopCheapestAvailable } from '@shared/utils';
import CardComponent from '../components/products/CardComponent';
import { Product } from '@shared/types';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3001/api/products?available=true')
      .then(res => res.json())
      .then(data => {
        setProducts(data.items || []);
        setError('');
      })
      .catch(err => {
        setError('Error: ' + (err?.message || 'No se pudo conectar'));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ maxWidth: 960, margin: '40px auto', padding: '0 16px' }}>
      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 16, textAlign: 'center' }}>Top 3 más económicos disponibles</h2>
        {loading && <p>Cargando productos...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            {getTopCheapestAvailable(products, 3).map((product: Product) => (
              <CardComponent key={product.id} product={product} />
            ))}
          </div>
        )}
        {/* H2 centrado con link a todos los productos */}
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <h2 style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Ir a todos los productos</h2>
          <a href="/products" style={{ display: 'inline-block', padding: '10px 24px', background: '#2563eb', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 'bold', fontSize: 16 }}>Ver catálogo completo</a>
        </div>
      </section>
    </main>
  );
}
