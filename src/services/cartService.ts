import axios from "axios";

const API_URL = "http://localhost:8081/api/cart";
// const API_URL = "https://tshopi-back-production.up.railway.app/api/cart";

export const addToCart = (data: {
    phone: string;
    productId: number;
    quantity: number;
}) => {
    return axios.post(`${API_URL}/add`, data);
};

export const getCart = (phone: string) => {
    return axios.get(`${API_URL}/${phone}`);
};

export const removeCartItem = (itemId: number) => {
    return axios.delete(`${API_URL}/item/${itemId}`);
};
