import axios, { AxiosError, type AxiosResponse } from 'axios';
import camelCaseKeys from 'camelcase-keys';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL + '/api',
  withCredentials: true,
});

interface CustomAxiosError {
  message?: string;
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    response.data = camelCaseKeys(response.data, { deep: true });
    return response;
  },
  (error: AxiosError<CustomAxiosError>) => {
    error.message = error.response?.data.message || error.message;
    return Promise.reject(error);
  },
);

export default axiosInstance;
