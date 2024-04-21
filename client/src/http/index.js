import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5173",
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
    }
});
export const createBooking = (data) => api.post(`/api/booking/book`, data);

export default api;