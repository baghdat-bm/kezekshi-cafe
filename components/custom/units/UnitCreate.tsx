'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';
import UnitForm, { UnitFormValues } from './UnitForm';
import useTranslationStore from "@/lib/store/useTranslationStore";
import {useGlobalStore} from "@/lib/store/globalStore";

const UnitCreate = () => {
    const router = useRouter();
    const { addUnit } = useMeasurementUnitStore();
    const { t } = useTranslationStore();
    const { setLoading } = useGlobalStore();

    const handleSubmit = async (data: UnitFormValues) => {
        setLoading(true);

        try {
            await addUnit(data);
            router.push('/admin/units');
        } catch (error) {
            console.error("Ошибка в addUnit:", error);
            // Можно добавить уведомление об ошибке
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/admin/units');
    };

    return (
        <div>
            <h1>{t("refs.createNewUnit")}</h1>
            <UnitForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitText={t("common.create")}
            />
        </div>
    );
};

export default UnitCreate;
