import axios from 'axios';

const Api = axios.create({
	baseURL: 'https://projetoseguranca-api.herokuapp.com/',
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
