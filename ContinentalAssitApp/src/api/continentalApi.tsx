import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseURL = 'https://api-eva.continentalassist.com/api';
//const baseURL = 'http://127.0.0.1:8300/api';
// const baseURL = 'https://testapiseva.testingcontinentalassist.tech/api';

const continentalApi = axios.create({ baseURL });

continentalApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default continentalApi;
