import axios from 'axios';
import { API_URL } from '@common/env';

export const nominatimApi = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  params: {
    format: 'json'
  }
});

// We use withCredentials because right now website and backend are served on diffrenet domains.
export const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true
});
