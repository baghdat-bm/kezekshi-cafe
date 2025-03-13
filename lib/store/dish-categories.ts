import {create} from 'zustand';
import {createItem, deleteItem, fetchItems, updateItem, fetchItem} from '@/lib/service/dish-categories';

export interface DishCategory {
    id: number;
    name: string;
    name_kz?: string | null;
    name_ru?: string | null;
    name_en?: string | null;
    logo: string;
    color: string;
    measurement_unit?: number | null;
}

interface DishCategoryStore {
    categories: DishCategory[];
    selectedCategory: DishCategory | null;
    fetchCategories: () => Promise<void>;
    fetchCategory: (id: number) => Promise<void>;
    addCategory: (categoryData: FormData) => Promise<void>;
    updateCategory: (id: number, categoryData: FormData) => Promise<void>;
    deleteCategory: (id: number) => Promise<void>;
}

export const useDishCategoryStore = create<DishCategoryStore>((set, get) => ({
    categories: [],
    selectedCategory: null,

    // Получение списка категорий
    fetchCategories: async () => {
        const data = await fetchItems();
        set({ categories: data });
    },

    // Получение одной категории
    fetchCategory: async (id: number) => {
        const data = await fetchItem(id);
        set({ selectedCategory: data });
    },

    // Добавление новой категории
    addCategory: async (categoryData) => {
        const newCategory = await createItem(categoryData);
        set({ categories: [...get().categories, newCategory] });
    },

    // Обновление категории
    updateCategory: async (id, categoryData) => {
        const updatedCategory = await updateItem(id, categoryData);
        set({
            categories: get().categories.map((cat) => (cat.id === id ? updatedCategory : cat)),
        });
    },

    // Удаление категории
    deleteCategory: async (id) => {
        await deleteItem(id);
        set({
            categories: get().categories.filter((cat) => cat.id !== id),
        });
    },
}));
