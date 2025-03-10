'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDishCategoryStore } from '@/lib/store/dish-categories';
import CategoryForm from './CategoryForm';

const CategoryCreate = () => {
    const router = useRouter();
    const { addCategory } = useDishCategoryStore();

    const handleSubmit = async (formData: FormData) => {
        try {
            await addCategory(formData);
            alert('Категория успешно добавлена!');
            router.push('/admin/categories');
        } catch (error) {
            console.error('Ошибка при создании категории:', error);
        }
    };

    const handleCancel = () => {
        router.push('/admin/categories');
    };

    return (
        <div>
            <h1>Добавить новую категорию</h1>
            <CategoryForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitText="Добавить категорию"
            />
        </div>
    );
};

export default CategoryCreate;
