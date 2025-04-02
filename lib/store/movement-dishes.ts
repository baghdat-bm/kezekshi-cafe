import {create} from 'zustand';
import {createItem, deleteItem, fetchItems, updateItem, fetchItem} from '@/lib/service/movement-dishes';

export interface MovementDishes {
    id: number;
    date: string;
    accepted: boolean;
    warehouse_from: number;
    warehouse_to: number;
    commentary: string;
    author: number;
    movement_dish_items: []
}

interface MovementDishesStore {
    movementsDishes: MovementDishes[];
    selectedMovementDishes: MovementDishes | null;
    fetchMovementsDishes: () => Promise<void>;
    fetchMovementDishes: (id: number) => Promise<void>;
    addMovementDishes: (itemData: {
        date: string;
        accepted: boolean;
        warehouse_from: number;
        warehouse_to: number;
        commentary: string;
        movement_dish_items: { dish: number; quantity: number }[]
    }) => Promise<void>;
    updateMovementDishes: (id: number, itemData: {
        date: string;
        accepted: boolean;
        warehouse_from: number;
        warehouse_to: number;
        commentary: string;
        movement_dish_items: { dish: number; quantity: number }[]
    }) => Promise<void>;
    deleteMovementDishes: (id: number) => Promise<void>;
}

export const useMovementDishesStore = create<MovementDishesStore>((set, get) => ({
    movementsDishes: [],
    selectedMovementDishes: null,

    // Получение списка элементов
    fetchMovementsDishes: async () => {
        const data = await fetchItems();
        set({ movementsDishes: data });
    },

    // Получение одного элемента
    fetchMovementDishes: async (id: number) => {
        const data = await fetchItem(id);
        set({ selectedMovementDishes: data });
    },

    // Добавление нового элемента
    addMovementDishes: async (itemData) => {
        const newItem = await createItem(itemData);
        set({ movementsDishes: [...get().movementsDishes, newItem] });
    },

    // Обновление элемента
    updateMovementDishes: async (id, itemData) => {
        const updatedItem = await updateItem(id, itemData);
        set({
            movementsDishes: get().movementsDishes.map((item) => (item.id === id ? updatedItem : item)),
        });
    },

    // Удаление элемента
    deleteMovementDishes: async (id) => {
        await deleteItem(id);
        set({
            movementsDishes: get().movementsDishes.filter((item) => item.id !== id),
        });
    },
}));
