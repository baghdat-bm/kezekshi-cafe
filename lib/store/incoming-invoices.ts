import {create} from 'zustand';
import {createItem, deleteItem, fetchItems, fetchItem, updateItem} from '@/lib/service/incoming-invoices';

export interface IncomingInvoice {
    id: number;
    number: string;
    date: string;
    accepted: boolean;
    warehouse: number;
    supplier: number;
    commentary: string;
    amount: number;
    shipping_cost: number;
    paid_amount: number;
    author: number;
    invoice_dish_items: []
}

interface IncomingInvoiceStore {
    incomingInvoices: IncomingInvoice[];
    selectedIncomingInvoice: IncomingInvoice | null;
    fetchIncomingInvoices: () => Promise<void>;
    fetchIncomingInvoice: (id: number) => Promise<void>;
    addIncomingInvoice: (unitData: Partial<IncomingInvoice>) => Promise<void>;
    updateIncomingInvoice: (id: number, unitData: Partial<IncomingInvoice>) => Promise<void>;
    deleteIncomingInvoice: (id: number) => Promise<void>;
}

export const useIncomingInvoiceStore = create<IncomingInvoiceStore>((set, get) => ({
    incomingInvoices: [],
    selectedIncomingInvoice: null,

    fetchIncomingInvoices: async () => {
        const data = await fetchItems();
        set({ incomingInvoices: data });
    },

    fetchIncomingInvoice: async (id: number) => {
        const data = await fetchItem(id);
        set({ selectedIncomingInvoice: data });
    },

    addIncomingInvoice: async (itemData) => {
        const newItem = await createItem(itemData);
        set({ incomingInvoices: [...get().incomingInvoices, newItem] });
    },

    updateIncomingInvoice: async (id, itemData) => {
        const updatedItem = await updateItem(id, itemData);
        set({
            incomingInvoices: get().incomingInvoices.map((item) => (item.id === id ? updatedItem : item)),
        });
    },

    deleteIncomingInvoice: async (id) => {
        await deleteItem(id);
        set({
            incomingInvoices: get().incomingInvoices.filter((item) => item.id !== id),
        });
    },
}));
