import {create} from 'zustand';
import {createItem, deleteItem, fetchItems, updateItem, fetchItem, fetchItemsExt} from '@/lib/service/dishes';

export interface Dish {
    id: number;
    name: string;
    name_kz?: string | null;
    name_ru?: string | null;
    name_en?: string | null;
    category?: number | null;
    logo: string;
    color: string;
    barcode?: string | null;
    measurement_unit?: number | null;
    remaining_quantity: number | null;
    price: number | null;
}

interface DishStore {
    dishes: Dish[];
    dishesExt: Dish[];
    selectedDish: Dish | null;
    fetchDishes: () => Promise<void>;
    fetchDishesExt: () => Promise<void>;
    fetchDish: (id: number) => Promise<void>;
    addDish: (dishData: FormData) => Promise<void>;
    updateDish: (id: number, dishData: FormData) => Promise<void>;
    deleteDish: (id: number) => Promise<void>;
}

export const useDishStore = create<DishStore>((set, get) => ({
    dishes: [],
    dishesExt: [],
    selectedDish: null,

    // Получение списка элементов
    fetchDishes: async () => {
        const data = await fetchItems();
        set({ dishes: data });
    },

    // Получение списка элементов
    fetchDishesExt: async () => {
        const data = await fetchItemsExt();
        set({ dishesExt: data });
    },

    // Получение одного элемента
    fetchDish: async (id: number) => {
        const data = await fetchItem(id);
        set({ selectedDish: data });
    },

    // Добавление нового элемента
    addDish: async (itemData) => {
        const newItem = await createItem(itemData);
        set({ dishes: [...get().dishes, newItem] });
    },

    // Обновление элемента
    updateDish: async (id, itemData) => {
        const updatedCategory = await updateItem(id, itemData);
        set({
            dishes: get().dishes.map((item) => (item.id === id ? updatedCategory : item)),
        });
    },

    // Удаление элемента
    deleteDish: async (id) => {
        await deleteItem(id);
        set({
            dishes: get().dishes.filter((item) => item.id !== id),
        });
    },
}));
