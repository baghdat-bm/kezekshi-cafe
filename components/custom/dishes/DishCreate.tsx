'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDishStore } from '@/lib/store/dishes';
import DishForm, { DishFormValues } from './DishForm';

const DishCreate = () => {
    const router = useRouter();
    const { addDish } = useDishStore();

    const handleSubmit = async (formData: FormData) => {
        await addDish(formData);
        router.push('/admin/dishes');
    };

    const handleCancel = () => {
        router.push('/admin/dishes');
    };

    return (
        <div>
            <h1>Создание блюда</h1>
            <DishForm onSubmit={handleSubmit} onCancel={handleCancel} submitText="Создать блюдо" />
        </div>
    );
};

export default DishCreate;
