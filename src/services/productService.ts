import { api } from './api';
import { Product } from '@/types';

export const productService = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data.data || [];
  },

  // Get product by ID
  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data.data || response.data;
  },

  // Create product (requires auth)
  create: async (data: Partial<Product>): Promise<Product> => {
    const response = await api.post('/products', data);
    return response.data;
  },

  // Update product (requires auth)
  update: async (id: string, data: Partial<Product>): Promise<Product> => {
    const response = await api.patch(`/products/${id}`, data);
    return response.data;
  },

  // Delete product (requires auth)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
