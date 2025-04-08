'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDishCategoryStore } from '@/lib/store/dish-categories';
import CategoryForm from './CategoryForm';
import useTranslationStore from "@/lib/store/useTranslationStore";
import {useGlobalStore} from "@/lib/store/globalStore";

const CategoryCreate = () => {
    const router = useRouter();
    const { addCategory } = useDishCategoryStore();
    const { t } = useTranslationStore();
    const { setLoading } = useGlobalStore();

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            await addCategory(formData);
            alert(t("refs.newCategoryAdded")+'!');
            router.push('/admin/categories');
        } catch (error) {
            console.error('Ошибка при создании категории:', error);
        } finally {
            setLoading(false);
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
