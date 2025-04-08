'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDishCategoryStore } from '@/lib/store/dish-categories';
import CategoryForm, { CategoryFormValues } from './CategoryForm';
import useTranslationStore from "@/lib/store/useTranslationStore";
import {useGlobalStore} from "@/lib/store/globalStore";

const CategoryEdit = () => {
    const router = useRouter();
    const params = useParams();
    const categoryId = Number(params.id);
    const { t } = useTranslationStore();
    const { setLoading } = useGlobalStore();

    const { selectedCategory, fetchCategory, updateCategory } = useDishCategoryStore();

    useEffect(() => {
        if (categoryId) {
            fetchCategory(categoryId);
        }
    }, [categoryId, fetchCategory]);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            await updateCategory(categoryId, formData);
            router.push('/admin/categories');
        } catch (error) {
            console.error('Ошибка при обновлении категории:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/admin/categories');
    };

    if (!selectedCategory) {
        return <div>{t("home.loading")}</div>;
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
            <h1>{t("refs.editCategory")} ({selectedCategory.id})</h1>
            <CategoryForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitText={t("common.save")}
            />
        </div>
    );
};

export default CategoryEdit;
