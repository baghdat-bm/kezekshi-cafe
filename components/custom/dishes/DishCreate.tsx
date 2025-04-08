'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDishStore } from '@/lib/store/dishes';
import DishForm from './DishForm';
import useTranslationStore from "@/lib/store/useTranslationStore";
import {useGlobalStore} from "@/lib/store/globalStore";

const DishCreate = () => {
    const router = useRouter();
    const { addDish } = useDishStore();
    const { t } = useTranslationStore();
    const { setLoading } = useGlobalStore();

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);

        try {
            await addDish(formData);
            router.push('/admin/dishes');
        } catch (error) {
            console.error("Ошибка в addDish:", error);
            // Можно добавить уведомление об ошибке
        } finally {
            setLoading(false);
        }
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
