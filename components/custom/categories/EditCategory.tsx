'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDishCategoryStore } from '@/lib/store/dish-categories';
import CategoryForm, { CategoryFormValues } from './CategoryForm';

const CategoryEdit = () => {
    const router = useRouter();
    const params = useParams();
    const categoryId = Number(params.id);

    const { selectedCategory, fetchCategory, updateCategory } = useDishCategoryStore();

    useEffect(() => {
        if (categoryId) {
            fetchCategory(categoryId);
        }
    }, [categoryId, fetchCategory]);

    const handleSubmit = async (formData: FormData) => {
        try {
            await updateCategory(categoryId, formData);
            router.push('/admin/categories');
        } catch (error) {
            console.error('Ошибка при обновлении категории:', error);
        }
    };

    const handleCancel = () => {
        router.push('/admin/categories');
    };

    if (!selectedCategory) {
        return <div>Загрузка...</div>;
    }

    const initialValues: CategoryFormValues = {
        id: selectedCategory.id,
        name_kz: selectedCategory.name_kz || '',
        name_ru: selectedCategory.name_ru || '',
        name_en: selectedCategory.name_en || '',
        logo: selectedCategory.logo || '',
        color: selectedCategory.color || '#4e6ee0',
        measurement_unit: selectedCategory.measurement_unit
            ? String(selectedCategory.measurement_unit)
            : '',
    };

    return (
        <div>
            <h1>Редактирование категории блюда</h1>
            <CategoryForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitText="Сохранить изменения"
            />
        </div>
    );
};

export default CategoryEdit;
