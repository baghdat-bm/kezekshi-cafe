import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import axios from "axios";
import {API_BASE_URL} from "@/lib/service/base";

const AUTH_API_URL = `${API_BASE_URL}/token/`;

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<{ access: string; refresh: string }>;
    refreshAccessToken: () => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create(
    persist<AuthState>(
        (set, get) => ({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: null,
            isLoading: true,

            login: async (username, password) => {
                try {
                    const response = await axios.post(AUTH_API_URL, {username, password});
                    const {access, refresh} = response.data;

                    set({accessToken: access, refreshToken: refresh, isAuthenticated: true, isLoading: false});
                    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

                    return {access, refresh}; // Возвращаем токены для сохранения в cookies
                } catch (error) {
                    console.error("Ошибка авторизации:", error);
                    throw new Error("Ошибка входа, проверьте данные");
                }
            },

            refreshAccessToken: async () => {
                try {
                    set({isLoading: true});
                    const refreshToken = get().refreshToken;
                    if (!refreshToken) {
                        set({isAuthenticated: false, isLoading: false});
                        return;
                    }

                    const response = await axios.post(`${AUTH_API_URL}refresh/`, {refresh: refreshToken});
                    const {access} = response.data;

                    set({accessToken: access, isAuthenticated: true, isLoading: false});
                    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
                } catch (error) {
                    console.error("Ошибка обновления токена:", error);
                    set({isAuthenticated: false, isLoading: false});
                }
            },

            logout: () => {
                set({accessToken: null, refreshToken: null, isAuthenticated: false, isLoading: false});
                delete axios.defaults.headers.common["Authorization"];
                document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                window.location.href = "/login";
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
