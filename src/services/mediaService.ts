import { api } from './api';

export const mediaService = {
  // Upload an image to the DB (requires auth); returns its "/media/<id>" path
  upload: async (file: File): Promise<string> => {
    const form = new FormData();
    form.append('file', file);
    const response = await api.post('/media', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data.url;
  },
};
