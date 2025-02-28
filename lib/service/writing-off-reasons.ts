import axios from "axios";
import {useAuthStore} from '@/lib/store/auth';
import {API_BASE_URL} from "@/lib/service/base";

const API_URL = `${API_BASE_URL}/writing-off-reasons/`;

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
        console.error('Ошибка при загрузке списка причин списания:', error);
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
        console.error('Ошибка при загрузке причины списания:', error);
        return [];
    }
};

// Создание нового элемента
export const createItem = async (itemData: any) => {
    const token = useAuthStore.getState().accessToken;
    try {
        const response = await axios.post(`${API_URL}`, itemData, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при создании причины списания:', error);
        throw error;
    }
};

// Обновление элемента
export const updateItem = async (id: number, itemData: any) => {
    const token = useAuthStore.getState().accessToken;
    try {
        const response = await axios.put(`${API_URL}${id}/`, itemData, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при обновлении причины списания:', error);
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
        console.error('Ошибка при удалении причины списания:', error);
        throw error;
    }
};
