import {create} from 'zustand';
import {fetchDishCategories} from '@/lib/api';

interface DishCategory {
    id: number;
    dish_order: number;
    name: string;
    logo: string;
    color: string;
}

interface DishCategoryStore {
    categories: DishCategory[];
    fetchCategories: (token: string) => Promise<void>;
}

export const useDishCategoryStore = create<DishCategoryStore>((set) => ({
    categories: [],
    fetchCategories: async (token) => {
        const data = await fetchDishCategories(token);
        set({categories: data});
    },
}));
