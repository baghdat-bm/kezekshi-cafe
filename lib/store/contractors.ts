import {create} from 'zustand';
import {createItem, deleteItem, fetchItems, fetchItem, updateItem} from '@/lib/service/contractors';

interface Contractor {
    id: number;
    name: string;
    bik?: string | null;
    bank?: string | null;
    corr_account?: string | null;
    check_account?: string | null;
}

interface ContractorStore {
    contractors: Contractor[];
    selectedContractor: Contractor | null;
    fetchContractors: () => Promise<void>;
    fetchContractor: (id: number) => Promise<void>;
    addContractor: (unitData: Partial<Contractor>) => Promise<void>;
    updateContractor: (id: number, unitData: Partial<Contractor>) => Promise<void>;
    deleteContractor: (id: number) => Promise<void>;
}

export const useContractorStore = create<ContractorStore>((set, get) => ({
    contractors: [],
    selectedContractor: null,

    fetchContractors: async () => {
        const data = await fetchItems();
        set({ contractors: data });
    },

    fetchContractor: async (id: number) => {
        const data = await fetchItem(id);
        set({ selectedContractor: data });
    },

    addContractor: async (itemData) => {
        const newItem = await createItem(itemData);
        set({ contractors: [...get().contractors, newItem] });
    },

    updateContractor: async (id, itemData) => {
        const updatedItem = await updateItem(id, itemData);
        set({
            contractors: get().contractors.map((item) => (item.id === id ? updatedItem : item)),
        });
    },

    deleteContractor: async (id) => {
        await deleteItem(id);
        set({
            contractors: get().contractors.filter((item) => item.id !== id),
        });
    },
}));
