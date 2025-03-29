import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import axios from "axios";
import {API_BASE_URL} from "@/lib/service/base";

const AUTH_API_URL = `${API_BASE_URL}/token/`;
const USER_DATA_URL = `${API_BASE_URL}/user-data/`;

interface UserData {
    user_id: number;
    user_name: string;
    profile_id: number;
    user_phone: string;
    user_photo: string;
    user_iin: string;
    school_id: number;
    school_name_kz: string;
    school_name_ru: string;
    school_name_en: string;
    school_bin: string;
    warehouse_id: number;
    warehouse_name: string;
}

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean | null;
    isLoading: boolean;
    erronOnRefreshToken: boolean | null;
    userData: UserData | null;
    login: (username: string, password: string) => Promise<{ access: string; refresh: string }>;
    fetchUserData: () => Promise<UserData | null>;
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
            userData: null,
            erronOnRefreshToken: null,

            login: async (username, password) => {
                try {
                  const response = await axios.post(AUTH_API_URL, { username, password });
                  const { access, refresh } = response.data;
              
                  set({
                    accessToken: access,
                    refreshToken: refresh,
                    isAuthenticated: true,
                    isLoading: false,
                    erronOnRefreshToken: null
                  });
                  
                  // Убедитесь, что заголовок устанавливается правильно
                  if (typeof window !== 'undefined') {
                    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
                  }
              
                  await get().fetchUserData();
                  return { access, refresh };
                } catch (error) {
                  console.error("Ошибка авторизации:", error);
                  throw error;
                }
              },

            fetchUserData: async () => {
                try {
                    const response = await axios.get(USER_DATA_URL);
                    const userData: UserData = response.data;
                    set({ userData });
                    return userData;
                } catch (error) {
                    console.error("Ошибка получения данных пользователя:", error);
                    return null;
                }
            },

            refreshAccessToken: async () => {
                try {
                    set({ isLoading: true });
                    const refreshToken = get().refreshToken;
                    if (!refreshToken) {
                        set({ isAuthenticated: false, isLoading: false });
                        return;
                    }

                    const response = await axios.post(`${AUTH_API_URL}refresh/`, { refresh: refreshToken });
                    const { access } = response.data;

                    set({ accessToken: access, isAuthenticated: true, isLoading: false, erronOnRefreshToken: false });
                    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

                    // После обновления токена обновляем данные пользователя
                    await get().fetchUserData();
                } catch (error) {
                    console.error("Ошибка обновления токена:", error);
                    set({ isAuthenticated: false, isLoading: false, erronOnRefreshToken: true });
                }
            },

            logout: () => {
                set({ accessToken: null, refreshToken: null, isAuthenticated: false, isLoading: false, userData: null });
                delete axios.defaults.headers.common["Authorization"];
                document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                window.location.href = "/login";
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => {
                if (typeof window !== 'undefined') {
                  return localStorage;
                }
                return {
                  getItem: () => null,
                  setItem: () => {},
                  removeItem: () => {}
                };
              }),
        }
    )
);
