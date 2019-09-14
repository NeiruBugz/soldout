import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://api.music10.ru/',
  timeout: 1000,
});

export default axiosInstance;
