import axios from "axios";
import https from 'https';

export const API_BASE_URL = "https://37.151.91.88/ru/school-api"; // url справочников
export const API_DOCS_URL = "https://37.151.91.88/ru/food-api"; // url документов


export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});