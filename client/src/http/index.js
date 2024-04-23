import axios from 'axios';

axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: "https://pseudo-owner.onrender.com",
    // withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
});
export const _fetchOfferListings = () => api.get('/api/listing/get?offer=true&limit=4');
export const createBooking = (data) => api.post(`/api/booking/book`, data);

export default api;