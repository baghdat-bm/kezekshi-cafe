import {create} from 'zustand';
import {createItem, deleteItem, fetchItems, updateItem, fetchItem} from '@/lib/service/students';

interface Student {
    id: number;
    full_name: string;
    phone?: string | null;
    iin?: string | null;
    parent?: number | null;
    personal_account?: string | null;
    birthday?: string | null;
    balance?: number | null;
    photo: string | null;
}

interface StudentStore {
    students: Student[];
    selectedStudent: Student | null;
    fetchStudents: () => Promise<void>;
    fetchStudent: (id: number) => Promise<void>;
    addStudent: (dishData: Partial<Student>) => Promise<void>;
    updateStudent: (id: number, dishData: Partial<Student>) => Promise<void>;
    deleteStudent: (id: number) => Promise<void>;
}

export const useStudentStore = create<StudentStore>((set, get) => ({
    students: [],
    selectedStudent: null,

    // Получение списка элементов
    fetchStudents: async () => {
        const data = await fetchItems();
        set({ students: data });
    },

    // Получение одного элемента
    fetchStudent: async (id: number) => {
        const data = await fetchItem(id);
        set({ selectedStudent: data });
    },

    // Добавление нового элемента
    addStudent: async (itemData) => {
        const newItem = await createItem(itemData);
        set({ students: [...get().students, newItem] });
    },

    // Обновление элемента
    updateStudent: async (id, itemData) => {
        const updatedItem = await updateItem(id, itemData);
        set({
            students: get().students.map((item) => (item.id === id ? updatedItem : item)),
        });
    },

    // Удаление элемента
    deleteStudent: async (id) => {
        await deleteItem(id);
        set({
            students: get().students.filter((item) => item.id !== id),
        });
    },
}));
