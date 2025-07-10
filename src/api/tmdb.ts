import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '35fd3412de0583993dfead2c169c1472';
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});