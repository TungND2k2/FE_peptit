import { api } from './api';
import { Category } from '@/types';

export const categoryService = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data.data || [];
  },

  // Create category (requires auth)
  create: async (data: Partial<Category>): Promise<Category> => {
    const response = await api.post('/categories', data);
    return response.data;
  },

  // Update category (requires auth)
  update: async (id: string, data: Partial<Category>): Promise<Category> => {
    const response = await api.patch(`/categories/${id}`, data);
    return response.data;
  },

  // Delete category (requires auth)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};
