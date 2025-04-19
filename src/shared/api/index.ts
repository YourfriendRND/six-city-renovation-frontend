import axios from 'axios';

const TIME_OUT = 10000;

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: TIME_OUT,
    headers: {
      'Content-Type': 'Application/json',
      'Content-Encoding': 'utf-8',
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Обработка успешного ответа
    return response;
  },
  (error) => {
    // Обработка ошибок ответа
    console.error('Axios error:', error);
    return Promise.reject(error);
  }
);
  
export default axiosInstance;
