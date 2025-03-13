import {create} from 'zustand';
import {createItem, deleteItem, fetchItems, updateItem, fetchItem} from '@/lib/service/warehouses';

export interface Warehouse {
    id: number;
    name: string;
    school?: number | null;
}

interface WarehouseStore {
    warehouses: Warehouse[];
    selectedWarehouse: Warehouse | null;
    fetchWarehouses: () => Promise<void>;
    fetchWarehouse: (id: number) => Promise<void>;
    addWarehouse: (warehouseData: Partial<Warehouse>) => Promise<void>;
    updateWarehouse: (id: number, warehouseData: Partial<Warehouse>) => Promise<void>;
    deleteWarehouse: (id: number) => Promise<void>;
}

export const useWarehouseStore = create<WarehouseStore>((set, get) => ({
    warehouses: [],
    selectedWarehouse: null,

    // Получение списка элементов
    fetchWarehouses: async () => {
        const data = await fetchItems();
        set({ warehouses: data });
    },

    // Получение одного элемента
    fetchWarehouse: async (id: number) => {
        const data = await fetchItem(id);
        set({ selectedWarehouse: data });
    },

    // Добавление нового элемента
    addWarehouse: async (itemData) => {
        const newItem = await createItem(itemData);
        set({ warehouses: [...get().warehouses, newItem] });
    },

    // Обновление элемента
    updateWarehouse: async (id, itemData) => {
        const updatedItem = await updateItem(id, itemData);
        set({
            warehouses: get().warehouses.map((item) => (item.id === id ? updatedItem : item)),
        });
    },

    // Удаление элемента
    deleteWarehouse: async (id) => {
        await deleteItem(id);
        set({
            warehouses: get().warehouses.filter((item) => item.id !== id),
        });
    },
}));
