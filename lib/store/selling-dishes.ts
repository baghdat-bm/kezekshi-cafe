import {create} from 'zustand';
import {createItem, deleteItem, fetchItems, fetchItem, updateItem} from '@/lib/service/selling-dishes';

interface SellingDishes {
    id: number;
    number: string;
    date: string;
    accepted: boolean;
    warehouse: number;
    student: number;
    commentary: string;
    amount: number;
    paid_amount: number;
    author: number;
    selling_dish_items: []
}

interface SellingDishesStore {
    sellingsDishes: SellingDishes[];
    selectedSellingDishes: SellingDishes | null;
    fetchSellingsDishes: () => Promise<void>;
    fetchSellingDishes: (id: number) => Promise<void>;
    addSellingDishes: (itemData: Partial<SellingDishes>) => Promise<void>;
    updateSellingDishes: (id: number, itemData: Partial<SellingDishes>) => Promise<void>;
    deleteSellingDishes: (id: number) => Promise<void>;
}

export const useSellingDishesStore = create<SellingDishesStore>((set, get) => ({
    sellingsDishes: [],
    selectedSellingDishes: null,

    fetchSellingsDishes: async () => {
        const data = await fetchItems();
        set({ sellingsDishes: data });
    },

    fetchSellingDishes: async (id: number) => {
        const data = await fetchItem(id);
        set({ selectedSellingDishes: data });
    },

    addSellingDishes: async (itemData) => {
        const newItem = await createItem(itemData);
        set({ sellingsDishes: [...get().sellingsDishes, newItem] });
    },

    updateSellingDishes: async (id, itemData) => {
        const updatedItem = await updateItem(id, itemData);
        set({
            sellingsDishes: get().sellingsDishes.map((item) => (item.id === id ? updatedItem : item)),
        });
    },

    deleteSellingDishes: async (id) => {
        await deleteItem(id);
        set({
            sellingsDishes: get().sellingsDishes.filter((item) => item.id !== id),
        });
    },
}));
