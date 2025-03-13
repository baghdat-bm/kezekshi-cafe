import {create} from 'zustand';
import {createItem, deleteItem, fetchItems, updateItem, fetchItem} from '@/lib/service/writing-off-reasons';

export interface WritingOffReason {
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
}

interface WritingOffReasonStore {
    writingOffReasons: WritingOffReason[];
    selectedWritingOffReason: WritingOffReason | null;
    fetchWritingOffReasons: () => Promise<void>;
    fetchWritingOffReason: (id: number) => Promise<void>;
    addWritingOffReason: (itemData: Partial<WritingOffReason>) => Promise<void>;
    updateWritingOffReason: (id: number, itemData: Partial<WritingOffReason>) => Promise<void>;
    deleteWritingOffReason: (id: number) => Promise<void>;
}

export const useWritingOffReasonStore = create<WritingOffReasonStore>((set, get) => ({
    writingOffReasons: [],
    selectedWritingOffReason: null,

    // Получение списка элементов
    fetchWritingOffReasons: async () => {
        const data = await fetchItems();
        set({ writingOffReasons: data });
    },

    // Получение одного элемента
    fetchWritingOffReason: async (id: number) => {
        const data = await fetchItem(id);
        set({ selectedWritingOffReason: data });
    },

    // Добавление нового элемента
    addWritingOffReason: async (itemData) => {
        const newItem = await createItem(itemData);
        set({ writingOffReasons: [...get().writingOffReasons, newItem] });
    },

    // Обновление элемента
    updateWritingOffReason: async (id, itemData) => {
        const updatedItem = await updateItem(id, itemData);
        set({
            writingOffReasons: get().writingOffReasons.map((item) => (item.id === id ? updatedItem : item)),
        });
    },

    // Удаление элемента
    deleteWritingOffReason: async (id) => {
        await deleteItem(id);
        set({
            writingOffReasons: get().writingOffReasons.filter((item) => item.id !== id),
        });
    },
}));
