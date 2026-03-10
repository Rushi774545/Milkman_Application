import axios from 'axios';

const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { Accept: 'application/json' }
});

api.interceptors.request.use((config) => {
    const customerToken = localStorage.getItem('customerToken');
    const staffToken = localStorage.getItem('staffToken');
    if (customerToken) {
        config.headers.Authorization = `Token ${customerToken}`;
    } else if (staffToken) {
        config.headers.Authorization = `Token ${staffToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // clear whichever token caused the failure
            if (localStorage.getItem('staffToken')) {
                localStorage.removeItem('staffToken');
                localStorage.removeItem('staffUser');
                window.location.href = '#/login';
            }
            if (localStorage.getItem('customerToken')) {
                localStorage.removeItem('customerToken');
                localStorage.removeItem('customerUser');
                window.location.href = '#/customer-login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
export { API_BASE_URL };
