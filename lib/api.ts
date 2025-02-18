import axios from "axios";

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
export const fetchDishCategories = async (token: string) => {
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