import axios from 'axios';

export const nominatimApi = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  params: {
    format: 'json'
  }
});

// We use withCredentials because right now website and backend are served on diffrenet domains.
export const api = axios.create({
  baseURL: 'http://127.0.0.1:3100/api',
  withCredentials: true
});