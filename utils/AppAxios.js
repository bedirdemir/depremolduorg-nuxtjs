import axios from 'axios';
export const AppAxios = axios.create({
  baseURL: 'https://kandilli-earthquake-api.vercel.app'
});