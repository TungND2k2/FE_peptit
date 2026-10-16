import { api } from './api';
import { ChatClick } from '@/types';

export const chatClickService = {
  // Chat button clicks from the website in the last `days` days (requires auth)
  getAll: async (days: number): Promise<ChatClick[]> => {
    const response = await api.get('/chat-clicks', { params: { days } });
    return response.data.data || [];
  },
};
