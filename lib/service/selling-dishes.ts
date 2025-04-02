import axios from "axios";
import {useAuthStore} from '@/lib/store/auth';
import {API_DOCS_URL} from "@/lib/service/base";

const API_URL = `${API_DOCS_URL}/selling-dishes/`;

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
        console.error('Ошибка при загрузке Продаж блюд:', error);
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
        console.error('Ошибка при загрузке Продажи блюд:', error);
        return [];
    }
};

// Создание нового элемента
export const createItem = async (itemData: {
    date?: string | null;
    accepted: boolean;
    warehouse: number;
    student: number;
    amount: number;
    paid_amount: number;
    commentary: string;
    selling_dish_items: { dish: number; quantity: number; sale_price: number; amount: number }[]
}) => {
    const token = useAuthStore.getState().accessToken;
    try {
        const response = await axios.post(`${API_URL}`, itemData, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при создании Продажи блюд:', error);
        throw error;
    }
};

// Обновление элемента
export const updateItem = async (id: number, itemData: {
    date: string;
    accepted: boolean;
    warehouse: number;
    student: number;
    amount: number;
    paid_amount: number;
    commentary: string;
    selling_dish_items: { dish: number; quantity: number; sale_price: number; amount: number }[]
}) => {
    const token = useAuthStore.getState().accessToken;
    try {
        const response = await axios.put(`${API_URL}${id}/`, itemData, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при обновлении Продажи блюд:', error);
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
        console.error('Ошибка при удалении Продажи блюд:', error);
        throw error;
    }
};
