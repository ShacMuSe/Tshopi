import axios from "axios";
import type { Order } from "../types/Order";

const API_URL = "http://localhost:8081/api/orders";
//const API_URL = "https://tshopi-back-production.up.railway.app/api/orders";

export const createOrder = (order: Order) => {
    return axios.post(API_URL, order);
};
