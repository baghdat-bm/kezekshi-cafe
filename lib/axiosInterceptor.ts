import axios from "axios";
import { useAuthStore } from "./store/auth";
import {API_BASE_URL} from "@/lib/service/base";

// Здесь можно добавить любые глобальные настройки axios
axios.defaults.baseURL = `${API_BASE_URL}`;

axios.interceptors.response.use(
    response => response,
    async error => {
        if (
            error.response &&
            error.response.status === 403 &&
            error.response.data &&
            error.response.data.code === "token_not_valid"
        ) {
            const originalRequest = error.config;
            if (!originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    await useAuthStore.getState().refreshAccessToken();
                    originalRequest.headers["Authorization"] = `Bearer ${useAuthStore.getState().accessToken}`;
                    return axios(originalRequest);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);
