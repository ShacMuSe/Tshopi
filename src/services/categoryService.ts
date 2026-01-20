import axios from "axios";
import type { Category } from "../types/Category";

const API_URL = "http://localhost:8081/api/categories";
//const API_URL = "https://tshopi-back-production.up.railway.app/api/categories";

export const getCategories = () =>
    axios.get<Category[]>(API_URL);
