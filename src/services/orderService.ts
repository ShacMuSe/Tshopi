import axios from "axios";

const API_URL = "http://localhost:8081/api/orders";

export const createOrder = (order: {
    productId: number;
    phone: string;
    email: string;
    address: string;
    quantity: number;
}) => {
    return axios.post(API_URL, order);
};
