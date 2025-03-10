'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDishStore } from '@/lib/store/dishes';
import DishForm, { DishFormValues } from './DishForm';

const DishEdit = () => {
    const router = useRouter();
    const params = useParams();
    const dishId = Number(params.id);

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
        return <div>Загрузка...</div>;
    }

    const initialValues: DishFormValues = {
        id: selectedDish.id,
        name_kz: selectedDish.name_kz || '',
        name_ru: selectedDish.name_ru || '',
        name_en: selectedDish.name_en || '',
        category: selectedDish.category ? String(selectedDish.category) : '',
        logo: selectedDish.logo || '',
        color: selectedDish.color || '#4e6ee0',
        barcode: selectedDish.barcode || '',
        measurement_unit: selectedDish.measurement_unit ? String(selectedDish.measurement_unit) : '',
    };

    return (
        <div>
            <h1>Редактирование блюда</h1>
            <DishForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitText="Сохранить изменения"
            />
        </div>
    );
};

export default DishEdit;
