import axios from 'axios';
console.log(
  process.env.API_HOST,
  process.env.API_DEFAULT_HOST,
  process.env.API_HOST || process.env.API_DEFAULT_HOST
);

const axiosInstance = axios.create({
  baseURL: process.env.API_HOST || process.env.API_DEFAULT_HOST,
  timeout: 1000,
});

export default axiosInstance;
