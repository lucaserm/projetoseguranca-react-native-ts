import axios from 'axios';
import { getUserLocalStorage } from '../context/AuthProvider/util';

const Api = axios.create({
	baseURL: 'http://192.168.100.5:9090/',
});

/* Api.interceptors.request.use(
  async (config) => {
    let user = { token: '' };
    getUserLocalStorage().then((res: { token: string }) => {
      user = res;
    })
    config.headers.Authorization = user?.token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); */

export default Api;
