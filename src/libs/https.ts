import axios from 'axios';

const https = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
});

https.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(localStorage.getItem("token")|| "");

    if (accessToken) {
      if (config.headers) config.headers.token = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

https.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default https;
