import axios from "axios";
import { API_DEFAULT_HOST } from "./variables";

const axiosInstance = axios.create({
  baseURL: process.env.API_HOST || API_DEFAULT_HOST,
});

export default axiosInstance;
