import axios from 'axios';
import { HttpStatusCode } from 'axios';

const TIME_OUT = 10000;

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: TIME_OUT,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Обработка успешного ответа
    return response;
  },
  (error) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      return Promise.reject(new Error(error.response?.data?.message || 'Unauthorized'));
    }
    // Обработка ошибок ответа
    console.error('Unhandle axios error:', error);
    return Promise.reject(error);
  }
);
  
export default axiosInstance;
