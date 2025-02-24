import {create} from 'zustand';
import {createDishCategory, deleteDishCategory, fetchDishCategories, updateDishCategory} from '@/lib/api';

interface DishCategory {
    id: number;
    name: string;
    logo: string;
    color: string;
    measurement_unit?: number | null;
}

interface DishCategoryStore {
    categories: DishCategory[];
    fetchCategories: () => Promise<void>;
    addCategory: (categoryData: Partial<DishCategory>) => Promise<void>;
    updateCategory: (id: number, categoryData: Partial<DishCategory>) => Promise<void>;
    deleteCategory: (id: number) => Promise<void>;
}

export const useDishCategoryStore = create<DishCategoryStore>((set, get) => ({
    categories: [],

    // Получение списка категорий
    fetchCategories: async () => {
        const data = await fetchDishCategories();
        set({ categories: data });
    },

    // Добавление новой категории
    addCategory: async (categoryData) => {
        const newCategory = await createDishCategory(categoryData);
        set({ categories: [...get().categories, newCategory] });
    },

    // Обновление категории
    updateCategory: async (id, categoryData) => {
        const updatedCategory = await updateDishCategory(id, categoryData);
        set({
            categories: get().categories.map((cat) => (cat.id === id ? updatedCategory : cat)),
        });
    },

    // Удаление категории
    deleteCategory: async (id) => {
        await deleteDishCategory(id);
        set({
            categories: get().categories.filter((cat) => cat.id !== id),
        });
    },
}));
