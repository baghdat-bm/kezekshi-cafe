import axios from "axios";
import {useAuthStore} from '@/lib/store/auth';
import {API_DOCS_URL} from "@/lib/service/base";

const API_URL = `${API_DOCS_URL}/incoming-invoices/`;

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
        console.error('Ошибка при загрузке Приходных накладных:', error);
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
        console.error('Ошибка при загрузке Приходной накладной:', error);
        return [];
    }
};

// Создание нового элемента
export const createItem = async (itemData: {
    date: string;
    accepted: boolean;
    warehouse: number;
    supplier: number;
    commentary: string;
    amount: number;
    shipping_cost: number;
    paid_amount: number;
    invoice_dish_items: {
        dish: number;
        quantity: number;
        measurement_unit: number;
        cost_price: number;
        sale_price: number
    }[]
}) => {
    const token = useAuthStore.getState().accessToken;
    try {
        const response = await axios.post(`${API_URL}`, itemData, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при создании Приходной накладной:', error);
        throw error;
    }
};

// Обновление элемента
export const updateItem = async (id: number, itemData: {
    date: string;
    accepted: boolean;
    warehouse: number;
    supplier: number;
    commentary: string;
    amount: number;
    shipping_cost: number;
    paid_amount: number;
    invoice_dish_items: {
        dish: number;
        quantity: number;
        measurement_unit: number;
        cost_price: number;
        sale_price: number
    }[]
}) => {
    const token = useAuthStore.getState().accessToken;
    try {
        const response = await axios.put(`${API_URL}${id}/`, itemData, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при обновлении Приходной накладной:', error);
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
        console.error('Ошибка при удалении Приходной накладной:', error);
        throw error;
    }
};
