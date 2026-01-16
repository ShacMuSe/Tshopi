import axios from "axios";

//const API_URL = "http://localhost:8081/api/orders";
const API_URL = "https://tshopi-back-production.up.railway.app/api/orders";

export const createOrder = (order: {
    productId: number;
    phone: string;
    email: string;
    address: string;
    quantity: number;
}) => {
    return axios.post(API_URL, order);
};
