import { api } from './api';
import { Blog } from '@/types';

export const blogService = {
  // Get all blogs
  getAll: async (): Promise<Blog[]> => {
    const response = await api.get('/blogs');
    return response.data.data || [];
  },

  // Get blog by ID
  getById: async (id: string): Promise<Blog> => {
    const response = await api.get(`/blogs/${id}`);
    return response.data.data || response.data;
  },

  // Create blog (requires auth)
  create: async (data: Partial<Blog>): Promise<Blog> => {
    const response = await api.post('/blogs', data);
    return response.data;
  },

  // Update blog (requires auth)
  update: async (id: string, data: Partial<Blog>): Promise<Blog> => {
    const response = await api.patch(`/blogs/${id}`, data);
    return response.data;
  },

  // Delete blog (requires auth)
  remove: async (id: string): Promise<void> => {
    await api.delete(`/blogs/${id}`);
  },
};
