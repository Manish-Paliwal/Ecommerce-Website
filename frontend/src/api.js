import axios from 'axios';

const API = axios.create({
  baseURL: process.env.BACKEND_URL || 'http://localhost:5000/api'
});

export default API;
