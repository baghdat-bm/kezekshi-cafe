import axios from "axios";
import {useAuthStore} from '@/lib/store/auth';
import {API_DOCS_URL} from "@/lib/service/base";

const API_URL = `${API_DOCS_URL}/movement-dishes/`;

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
        console.error('Ошибка при загрузке перемещений на склады:', error);
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
        console.error('Ошибка при загрузке перемещения на склад:', error);
        return [];
    }
};

// Создание нового элемента
export const createItem = async (itemData: {
    number: string;
    date: string;
    accepted: boolean;
    warehouse_from: number;
    warehouse_to: number;
    commentary: string;
    movement_dish_items: { dish: number; quantity: number }[]
}) => {
    const token = useAuthStore.getState().accessToken;
    try {
        const response = await axios.post(`${API_URL}`, itemData, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при создании перемещения на склад:', error);
        throw error;
    }
};

// Обновление элемента
export const updateItem = async (id: number, itemData: {
    number: string;
    date: string;
    accepted: boolean;
    warehouse_from: number;
    warehouse_to: number;
    commentary: string;
    movement_dish_items: { dish: number; quantity: number }[]
}) => {
    const token = useAuthStore.getState().accessToken;
    try {
        const response = await axios.put(`${API_URL}${id}/`, itemData, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при обновлении перемещения на склад:', error);
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
        console.error('Ошибка при удалении перемещения на склад:', error);
        throw error;
    }
};
