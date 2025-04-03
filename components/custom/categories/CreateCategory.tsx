'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDishCategoryStore } from '@/lib/store/dish-categories';
import CategoryForm from './CategoryForm';
import useTranslationStore from "@/lib/store/useTranslationStore";

const CategoryCreate = () => {
    const router = useRouter();
    const { addCategory } = useDishCategoryStore();
    const { t } = useTranslationStore();

    const handleSubmit = async (formData: FormData) => {
        try {
            await addCategory(formData);
            alert(t("refs.newCategoryAdded")+'!');
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
            <h1>{t("refs.createNewCategory")}</h1>
            <CategoryForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitText={t("refs.addCategory")}
            />
        </div>
    );
};

export default CategoryCreate;
