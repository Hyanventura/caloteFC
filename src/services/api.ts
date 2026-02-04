import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.NODE_API_URL, // Defina sua URL padrão aqui ou no .env
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
