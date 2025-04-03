'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDishStore } from '@/lib/store/dishes';
import DishForm from './DishForm';
import useTranslationStore from "@/lib/store/useTranslationStore";

const DishCreate = () => {
    const router = useRouter();
    const { addDish } = useDishStore();
    const { t } = useTranslationStore();

    const handleSubmit = async (formData: FormData) => {
        await addDish(formData);
        router.push('/admin/dishes');
    };

    const handleCancel = () => {
        router.push('/admin/dishes');
    };

    return (
        <div>
            <h1>{t("refs.createNewDish")}</h1>
            <DishForm onSubmit={handleSubmit} onCancel={handleCancel} submitText={t("common.create")} />
        </div>
    );
};

export default DishCreate;
