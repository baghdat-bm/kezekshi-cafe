import axios from "axios";
import {useAuthStore} from '@/lib/store/auth';
import {API_DOCS_URL} from "@/lib/service/base";

const API_URL = `${API_DOCS_URL}/write-off-from-warehouses/`;

// сервис для получения списка элементов
export const fetchItems = async () => {
    const token = useAuthStore.getState().accessToken;
    try {
        const response = await axios.get(`${API_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке списаний со склада:', error);
        return [];
    }
};

// сервис для получения одного элемента
export const fetchItem = async (id: number) => {
    const token = useAuthStore.getState().accessToken;
    try {
        const response = await axios.get(`${API_URL}${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке списания со склада:', error);
        return [];
    }
};

// Создание нового элемента
export const createItem = async (categoryData: any) => {
    const token = useAuthStore.getState().accessToken;
    try {
        const response = await axios.post(`${API_URL}`, categoryData, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при создании списания со склада:', error);
        throw error;
    }
};

// Обновление элемента
export const updateItem = async (id: number, categoryData: any) => {
    const token = useAuthStore.getState().accessToken;
    try {
        const response = await axios.put(`${API_URL}${id}/`, categoryData, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при обновлении списания со склада:', error);
        throw error;
    }
};

// Удаление элемента
export const deleteItem = async (id: number) => {
    const token = useAuthStore.getState().accessToken;
    try {
        await axios.delete(`${API_URL}${id}/`, {
            headers: {Authorization: `Bearer ${token}`},
        });
    } catch (error) {
        console.error('Ошибка при удалении списания со склада:', error);
        throw error;
    }
};
