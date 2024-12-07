import axios, { AxiosInstance } from 'axios';

const axiosinstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true 
});

export default axiosinstance;
