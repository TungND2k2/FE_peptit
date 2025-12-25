import { api } from './api';
import { Accessory } from '@/types';

export const accessoryService = {
  // Get all accessories
  getAll: async (): Promise<Accessory[]> => {
    const response = await api.get('/accessories');
    return response.data.data || [];
  },

  // Get accessory by ID
  getById: async (id: string): Promise<Accessory> => {
    const response = await api.get(`/accessories/${id}`);
    return response.data.data || response.data;
  },

  // Create accessory (requires auth)
  create: async (data: Partial<Accessory>): Promise<Accessory> => {
    const response = await api.post('/accessories', data);
    return response.data;
  },

  // Update accessory (requires auth)
  update: async (id: string, data: Partial<Accessory>): Promise<Accessory> => {
    const response = await api.patch(`/accessories/${id}`, data);
    return response.data;
  },

  // Delete accessory (requires auth)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/accessories/${id}`);
  },
};
