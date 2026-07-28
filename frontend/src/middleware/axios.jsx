import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
    timeout: 5000,
});

api.interceptors.request.use((req) => {
    const token = localStorage.getItem('Authorization');

    if (token) {
        req.headers.Authorization = token;
    }

    return req;
});

api.interceptors.response.use((res) => {
    return res;
}, (error) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('Authorization');
        window.location.href = '/login';
    }

    return Promise.reject(error);
});

export default api