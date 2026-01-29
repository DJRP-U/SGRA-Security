import { getToken } from '@/actions/authActions';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_BACKEND,
  headers: {
    "Accept": "application/json",
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    const backendError = error.response?.data;

    return Promise.reject(
      backendError?.detail
        ? backendError
        : {
          detail: "Ocurrió un error inesperado. Intenta nuevamente más tarde."
        }
    );
  }
);