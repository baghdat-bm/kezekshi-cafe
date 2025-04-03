'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';
import UnitForm, { UnitFormValues } from './UnitForm';
import useTranslationStore from "@/lib/store/useTranslationStore";

const UnitCreate = () => {
    const router = useRouter();
    const { addUnit } = useMeasurementUnitStore();
    const { t } = useTranslationStore();

    const handleSubmit = async (data: UnitFormValues) => {
        await addUnit(data);
        router.push('/admin/units');
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
