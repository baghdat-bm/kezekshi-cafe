'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';
import UnitForm, { UnitFormValues } from './UnitForm';
import useTranslationStore from "@/lib/store/useTranslationStore";

const UnitEdit = () => {
    const router = useRouter();
    const params = useParams();
    const unitId = Number(params.id);

    const { selectedUnit, fetchUnit, updateUnit } = useMeasurementUnitStore();
    const { t } = useTranslationStore();

    useEffect(() => {
        if (unitId) {
            fetchUnit(unitId);
        }
    }, [unitId, fetchUnit]);

    const handleSubmit = async (data: UnitFormValues) => {
        await updateUnit(unitId, data);
        router.push('/admin/units');
    };

    const handleCancel = () => {
        router.push('/admin/units');
    };

    if (!selectedUnit) {
        return <div>{t("home.loading")}</div>;
    }

    const initialValues: UnitFormValues = {
        id: selectedUnit.id,
        name_kz: selectedUnit.name_kz || '',
        name_ru: selectedUnit.name_ru || '',
        name_en: selectedUnit.name_en || '',
    };

    return (
        <div>
            <h1>{t("refs.editUnt")} ({selectedUnit.id})</h1>
            <UnitForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitText={t("common.save")}
            />
        </div>
    );
};

export default UnitEdit;
