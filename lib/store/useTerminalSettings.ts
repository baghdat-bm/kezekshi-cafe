import {create} from 'zustand';
import {createItem, deleteItem, fetchItems, updateItem, fetchItem} from '@/lib/service/terminalSettings';

export interface TerminalSettings {
    id: number;
    school_id: number;
    ip_address: string;
    port: string;
    username: string;
    access_token?: string | null;
    refresh_token?: string | null;
    expiration_date?: string | null;
    use_https: boolean;
}

interface TerminalSettingsStore {
    terminalSettingsList: TerminalSettings[];
    selectedTerminalSettings: TerminalSettings | null;
    fetchTerminalSettingsList: () => Promise<void>;
    fetchTerminalSettings: (id: number) => Promise<void>;
    addTerminalSettings: (itemData: Partial<TerminalSettings>) => Promise<void>;
    updateTerminalSettings: (id: number, itemData: Partial<TerminalSettings>) => Promise<void>;
    deleteTerminalSettings: (id: number) => Promise<void>;
}

export const useTerminalSettingsStore = create<TerminalSettingsStore>((set, get) => ({
    terminalSettingsList: [],
    selectedTerminalSettings: null,

    // Получение списка элементов
    fetchTerminalSettingsList: async () => {
        const data = await fetchItems();
        set({ terminalSettingsList: data });
    },

    // Получение одного элемента
    fetchTerminalSettings: async (id: number) => {
        const data = await fetchItem(id);
        set({ selectedTerminalSettings: data });
    },

    // Добавление нового элемента
    addTerminalSettings: async (itemData) => {
        const newItem = await createItem(itemData);
        set({ terminalSettingsList: [...get().terminalSettingsList, newItem] });
    },

    // Обновление элемента
    updateTerminalSettings: async (id, itemData) => {
        const updatedItem = await updateItem(id, itemData);
        set({
            terminalSettingsList: get().terminalSettingsList.map((item) => (item.id === id ? updatedItem : item)),
        });
    },

    // Удаление элемента
    deleteTerminalSettings: async (id) => {
        await deleteItem(id);
        set({
            terminalSettingsList: get().terminalSettingsList.filter((item) => item.id !== id),
        });
    },
}));
