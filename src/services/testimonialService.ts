import { api } from './api';
import { Testimonial } from '@/types';

export const testimonialService = {
  // Get all testimonials
  getAll: async (): Promise<Testimonial[]> => {
    const response = await api.get('/testimonials');
    return response.data.data || [];
  },

  // Get testimonial by ID
  getById: async (id: string): Promise<Testimonial> => {
    const response = await api.get(`/testimonials/${id}`);
    return response.data.data || response.data;
  },

  // Create testimonial (requires auth)
  create: async (data: Partial<Testimonial>): Promise<Testimonial> => {
    const response = await api.post('/testimonials', data);
    return response.data;
  },

  // Update testimonial (requires auth)
  update: async (id: string, data: Partial<Testimonial>): Promise<Testimonial> => {
    const response = await api.patch(`/testimonials/${id}`, data);
    return response.data;
  },

  // Delete testimonial (requires auth)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/testimonials/${id}`);
  },
};
