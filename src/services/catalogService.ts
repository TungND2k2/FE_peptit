import { api } from './api';
import { Catalog } from '@/types';

export const catalogService = {
  // Get all catalogs
  getAll: async (): Promise<Catalog[]> => {
    const response = await api.get('/catalogs');
    return response.data.data || [];
  },

  // Get catalog by ID
  getById: async (id: string): Promise<Catalog> => {
    const response = await api.get(`/catalogs/${id}`);
    return response.data.data || response.data;
  },

  // Create catalog (requires auth)
  create: async (data: Partial<Catalog>): Promise<Catalog> => {
    const response = await api.post('/catalogs', data);
    return response.data;
  },

  // Update catalog (requires auth)
  update: async (id: string, data: Partial<Catalog>): Promise<Catalog> => {
    const response = await api.patch(`/catalogs/${id}`, data);
    return response.data;
  },

  // Delete catalog (requires auth)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/catalogs/${id}`);
  },
};
