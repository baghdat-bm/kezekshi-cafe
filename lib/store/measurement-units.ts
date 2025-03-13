import {create} from 'zustand';
import {createItem, deleteItem, fetchItems, fetchItem, updateItem} from '@/lib/service/measurement-units';

export interface MeasurementUnit {
    id: number;
    name: string;
    name_kz?: string | null;
    name_ru?: string | null;
    name_en?: string | null;
}

interface MeasurementUnitStore {
    units: MeasurementUnit[];
    selectedUnit: MeasurementUnit | null;
    fetchUnits: () => Promise<void>;
    fetchUnit: (id: number) => Promise<void>;
    addUnit: (unitData: Partial<MeasurementUnit>) => Promise<void>;
    updateUnit: (id: number, unitData: Partial<MeasurementUnit>) => Promise<void>;
    deleteUnit: (id: number) => Promise<void>;
}

export const useMeasurementUnitStore = create<MeasurementUnitStore>((set, get) => ({
    units: [],
    selectedUnit: null,

    fetchUnits: async () => {
        const data = await fetchItems();
        set({ units: data });
    },

    fetchUnit: async (id: number) => {
        const data = await fetchItem(id);
        set({ selectedUnit: data });
    },

    addUnit: async (unitData) => {
        const newUnit = await createItem(unitData);
        set({ units: [...get().units, newUnit] });
    },

    updateUnit: async (id, unitData) => {
        const updatedUnit = await updateItem(id, unitData);
        set({
            units: get().units.map((unit) => (unit.id === id ? updatedUnit : unit)),
        });
    },

    deleteUnit: async (id) => {
        await deleteItem(id);
        set({
            units: get().units.filter((unit) => unit.id !== id),
        });
    },
}));
