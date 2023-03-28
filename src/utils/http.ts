import axios from 'axios';
import { getToken } from './tokenHelper';
import qs from 'qs';
import toast from "react-hot-toast";

const baseUrl = process.env.REACT_APP_API_BASE_URL;


const http = axios.create({
  baseURL: baseUrl,
  timeout: 300000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    'Cache-Control': 'no-store',
  },
  paramsSerializer: {
    serialize: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  },
});

http.interceptors.request.use(
  (config) => {
    const headerToken = getToken();
    if (headerToken) {
      config.headers.Authorization = `Bearer ${headerToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      toast.error(response.data.error || 'Something went wrong...');
    }
    return Promise.reject(response.data);
  },
  async (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    if (error.response.status === 500) {
      toast.error(error.response.data.error || 'Something went wrong...');
    }
    if (error.response.status === 403) {
      toast.error(error.response.data.error || 'Something went wrong...');
    }
    return Promise.reject(error);
  }
);

export default http;
