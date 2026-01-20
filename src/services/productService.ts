import axios from "axios";
import type { Product } from "../types/Product";
//const API_URL = "http://localhost:8081/api/products"; 
const API_URL = "https://tshopi-back-production.up.railway.app/api/products";

export const getProducts = () =>
    axios.get<Product[]>(API_URL);

export const createProduct = (product: Product) =>
    axios.post<Product>(API_URL, product);

export const deleteProduct = (id: number) =>
    axios.delete(`${API_URL}/${id}`);
