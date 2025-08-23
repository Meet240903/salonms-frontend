import axios from 'axios';
import { logoutUser } from './auth';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Automatically attach token to each request if exists
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("salonms_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Optional: response error handling (e.g., token expiry)
API.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            logoutUser();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default API;