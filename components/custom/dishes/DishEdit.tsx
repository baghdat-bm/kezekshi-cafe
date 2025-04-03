'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDishStore } from '@/lib/store/dishes';
import DishForm, { DishFormValues } from './DishForm';
import useTranslationStore from "@/lib/store/useTranslationStore";

const DishEdit = () => {
    const router = useRouter();
    const params = useParams();
    const dishId = Number(params.id);
    const { t } = useTranslationStore();

    const { selectedDish, fetchDish, updateDish } = useDishStore();

    useEffect(() => {
        if (dishId) {
            fetchDish(dishId);
        }
    }, [dishId, fetchDish]);

    const handleSubmit = async (formData: FormData) => {
        await updateDish(dishId, formData);
        router.push('/admin/dishes');
    };

    const handleCancel = () => {
        router.push('/admin/dishes');
    };

    if (!selectedDish) {
        return <div>{t("home.loading")}</div>;
    }

    const initialValues: DishFormValues = {
        id: selectedDish.id,
        name_kz: selectedDish.name_kz || '',
        name_ru: selectedDish.name_ru || '',
        name_en: selectedDish.name_en || '',
        category: selectedDish.category ? String(selectedDish.category) : '',
        logo: selectedDish.logo || '',
        barcode: selectedDish.barcode || '',
        measurement_unit: selectedDish.measurement_unit ? String(selectedDish.measurement_unit) : '',
    };

    return (
        <div>
            <h1>{t("refs.editDish")} ({selectedDish.id})</h1>
            <DishForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitText={t("common.save")}
            />
        </div>
    );
};

export default DishEdit;
