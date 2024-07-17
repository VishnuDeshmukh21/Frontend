// api.js or axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ecommerce-backend-7jzj.onrender.com',
  // You can add other custom settings here
});

export default instance;
