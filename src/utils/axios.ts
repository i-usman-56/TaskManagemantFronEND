// utils/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7418/api/', // Adjust based on your API structure
});

export default axiosInstance;
