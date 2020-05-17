import axios from 'axios';
import { getToken } from '../services/Index';

const Api = axios.create({
  baseURL: 'http://54.233.238.26:8080/projectmanager/api/v1'
});

Api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers.Authorization = `Bearer OTA2ZmFlM2Y3MWZiZmM1ZmRhMWEzYThmODdiNzU4ODE=`;
  }
  return config;
});

export default Api;