import axios from "axios";

export const API_BASE_URL = "http://localhost:8000/ru/school-api"; // url справочников
export const API_DOCS_URL = "http://localhost:8000/ru/food-api"; // url документов


export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
    },
});
