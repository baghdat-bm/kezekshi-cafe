import axios from "axios";
import { useAuthStore } from '@/lib/auth-store';

const API_BASE_URL = "http://localhost:8000/ru/school-api"; // url бэкенд

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Функция для установки токена после входа
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// сервис для получения списка категорий блюд
export const fetchDishCategories = async () => {
  const token = useAuthStore.getState().accessToken;
  try {
    const response = await axios.get(`${API_BASE_URL}/dishes-categories/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке категорий блюд:', error);
    return [];
  }
};

// Создание новой категории
export const createDishCategory = async (categoryData: any) => {
  const token = useAuthStore.getState().accessToken;
  try {
    const response = await axios.post(`${API_BASE_URL}/dishes-categories/`, categoryData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании категории блюд:', error);
    throw error;
  }
};

// Обновление категории
export const updateDishCategory = async (id: number, categoryData: any) => {
  const token = useAuthStore.getState().accessToken;
  try {
    const response = await axios.put(`${API_BASE_URL}/dishes-categories/${id}/`, categoryData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении категории блюд:', error);
    throw error;
  }
};

// Удаление категории
export const deleteDishCategory = async (id: number) => {
  const token = useAuthStore.getState().accessToken;
  try {
    await axios.delete(`${API_BASE_URL}/dishes-categories/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Ошибка при удалении категории блюд:', error);
    throw error;
  }
};
