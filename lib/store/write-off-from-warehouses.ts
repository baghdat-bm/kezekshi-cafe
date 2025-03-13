import {create} from 'zustand';
import {createItem, deleteItem, fetchItems, updateItem, fetchItem} from '@/lib/service/write-off-from-warehouses';

export interface WriteOffFromWarehouse {
    id: number;
    number: string;
    date: string;
    accepted: boolean;
    warehouse: number;
    writing_off_reason: number;
    commentary: string;
    author: number;
    write_off_dish_items: []
}

interface WarehouseStore {
    writeOffFromWarehouses: WriteOffFromWarehouse[];
    selectedWriteOffFromWarehouse: WriteOffFromWarehouse | null;
    fetchWriteOffFromWarehouses: () => Promise<void>;
    fetchWriteOffFromWarehouse: (id: number) => Promise<void>;
    addWriteOffFromWarehouse: (writeOffFromWarehouseData: {
        number: string;
        date: string;
        accepted: boolean;
        warehouse: number;
        writing_off_reason: number;
        commentary: string;
        write_off_dish_items: { dish: number; quantity: number }[]
    }) => Promise<void>;
    updateWriteOffFromWarehouse: (id: number, writeOffFromWarehouseData: {
        number: string;
        date: string;
        accepted: boolean;
        warehouse: number;
        writing_off_reason: number;
        commentary: string;
        write_off_dish_items: { dish: number; quantity: number }[]
    }) => Promise<void>;
    deleteWriteOffFromWarehouse: (id: number) => Promise<void>;
}

export const useWriteOffFromWarehouseStore = create<WarehouseStore>((set, get) => ({
    writeOffFromWarehouses: [],
    selectedWriteOffFromWarehouse: null,

    // Получение списка элементов
    fetchWriteOffFromWarehouses: async () => {
        const data = await fetchItems();
        set({ writeOffFromWarehouses: data });
    },

    // Получение одного элемента
    fetchWriteOffFromWarehouse: async (id: number) => {
        const data = await fetchItem(id);
        set({ selectedWriteOffFromWarehouse: data });
    },

    // Добавление нового элемента
    addWriteOffFromWarehouse: async (itemData) => {
        const newItem = await createItem(itemData);
        set({ writeOffFromWarehouses: [...get().writeOffFromWarehouses, newItem] });
    },

    // Обновление элемента
    updateWriteOffFromWarehouse: async (id, itemData) => {
        const updatedItem = await updateItem(id, itemData);
        set({
            writeOffFromWarehouses: get().writeOffFromWarehouses.map((item) => (item.id === id ? updatedItem : item)),
        });
    },

    // Удаление элемента
    deleteWriteOffFromWarehouse: async (id) => {
        await deleteItem(id);
        set({
            writeOffFromWarehouses: get().writeOffFromWarehouses.filter((item) => item.id !== id),
        });
    },
}));
