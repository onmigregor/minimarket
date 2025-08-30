// Test de integración para los endpoints principales de la API
/**
 * Este archivo prueba los endpoints HTTP:
 * - /api/products con filtros y paginación
 * - /api/products/:id para detalle y error
 * - /api/top-cheapest para productos más económicos
 */
import request from 'supertest';
import app from '../../../src/index';

describe('API endpoints', () => {
  it('GET /api/products devuelve productos paginados', async () => {
    const res = await request(app).get('/api/products?page=1&limit=5');
    expect(res.status).toBe(200);
    expect(res.body.items.length).toBeLessThanOrEqual(5);
  });

  it('GET /api/products/:id devuelve detalle de producto existente', async () => {
    const res = await request(app).get('/api/products/p1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 'p1');
  });

  it('GET /api/products/:id devuelve 404 para producto inexistente', async () => {
    const res = await request(app).get('/api/products/p9999');
    expect(res.status).toBe(404);
  });

  it('GET /api/top-cheapest devuelve los más económicos', async () => {
    const res = await request(app).get('/api/top-cheapest');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeLessThanOrEqual(5);
  });
});
