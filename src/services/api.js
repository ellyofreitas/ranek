import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

api.interceptors.request.use(
  config => {
    const { token } = localStorage;
    if (token) {
      return {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${token}` },
      };
    }
    return config;
  },
  err => Promise.reject(err)
);

export default api;

export const validateToken = () => api.get('/sessions');

export const getZipcode = cep =>
  axios.get(`https://viacep.com.br/ws/${cep}/json`);
