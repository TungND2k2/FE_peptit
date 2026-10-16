import { api } from './api';
import { ChatClick } from '@/types';

export interface ChatClickPage {
  items: ChatClick[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ChatClickSummary {
  total: number;
  whatsapp: number;
  messenger: number;
  mobile: number;
  topPages: { label: string; count: number }[];
  topSources: { label: string | null; count: number }[];
}

// Website chat button clicks in the last `days` days (both require auth)
export const chatClickService = {
  getPage: async (days: number, page: number, pageSize = 20): Promise<ChatClickPage> => {
    const response = await api.get('/chat-clicks', { params: { days, page, pageSize } });
    return response.data.data;
  },

  getSummary: async (days: number): Promise<ChatClickSummary> => {
    const response = await api.get('/chat-clicks/summary', { params: { days } });
    return response.data.data;
  },
};
