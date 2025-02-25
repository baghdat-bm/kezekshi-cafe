import axios from "axios";

export const API_BASE_URL = "http://localhost:8000/ru/school-api"; // url бэкенд


export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
