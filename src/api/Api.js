import axios from 'axios';

const AxiosApi = axios.create({
  baseURL: 'https://solucardz.com/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default AxiosApi;
