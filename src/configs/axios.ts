import axiosLib, { AxiosError, type AxiosResponse } from 'axios';
import camelCaseKeys from 'camelcase-keys';

const axios = axiosLib.create({
  baseURL: import.meta.env.VITE_APP_URL + '/api',
  withCredentials: true,
});

interface CustomAxiosError {
  message?: string;
}

axios.interceptors.response.use(
  (rep: AxiosResponse) => {
    rep.data = camelCaseKeys(rep.data, { deep: true });
    return rep;
  },
  (error: AxiosError<CustomAxiosError>) => {
    error.message = error.response?.data.message || error.message;
    return Promise.reject(error);
  },
);

export default axios;
