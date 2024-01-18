import axios, { AxiosError, type AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL + "/api",
  withCredentials: true,
});

interface CustomAxiosError {
  message?: string;
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<CustomAxiosError>) => {
    error.message = error.response?.data.message || error.message;

    return Promise.reject(error);
  }
);

export default axiosInstance;
