import axiosLib, { AxiosError, type AxiosResponse } from 'axios';
import camelCaseKeys from 'camelcase-keys';

const axios = axiosLib.create({
  baseURL: import.meta.env.VITE_APP_URL + '/api',
  withCredentials: true,
  withXSRFToken: true,
});

const getCookie = (name: string) => {
  const cookie = document.cookie
    .split(';')
    .find((item) => item.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.split('=')[1]);
};

axios.interceptors.request.use(async (req) => {
  if (req.method === 'get') {
    return req;
  }

  const csrfToken = getCookie('XSRF-TOKEN');

  if (!csrfToken) {
    await axios.get(import.meta.env.VITE_APP_URL + '/sanctum/csrf-cookie');
  }

  return req;
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
