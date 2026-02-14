import axios from 'axios';

export const BACKEND_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: `${BACKEND_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Important: Explicitly handle XSRF token from cookies
api.interceptors.request.use(config => {
    const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1];
    if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
    return config;
});

// Helper to initialize CSRF protection
export const initAuth = () => {
    return api.get(`${BACKEND_URL}/sanctum/csrf-cookie`);
};

export default api;
