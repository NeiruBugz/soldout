import axios from 'axios';
import { API_HOST } from './variables';

const axiosInstance = axios.create({
  baseURL: API_HOST,
});

export default axiosInstance;
