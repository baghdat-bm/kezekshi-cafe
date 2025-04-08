import { create } from 'zustand';

interface GlobalStore {
    loading: boolean;
    setLoading: (value: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
    loading: false,
    setLoading: (value: boolean) => set({ loading: value }),
}));
