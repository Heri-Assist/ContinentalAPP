import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseURL = 'https://continentalassist.co/backmin/restapp';

const continentalApi = axios.create({baseURL})

continentalApi.interceptors.request.use(
    async (config) => {
        const token = AsyncStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }
)


export default continentalApi;

