'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';
import UnitForm, { UnitFormValues } from './UnitForm';
import useTranslationStore from "@/lib/store/useTranslationStore";
import {useGlobalStore} from "@/lib/store/globalStore";

const UnitEdit = () => {
    const router = useRouter();
    const params = useParams();
    const unitId = Number(params.id);

    const { selectedUnit, fetchUnit, updateUnit } = useMeasurementUnitStore();
    const { t } = useTranslationStore();
    const { setLoading } = useGlobalStore();

    useEffect(() => {
        if (unitId) {
            fetchUnit(unitId);
        }
    }, [unitId, fetchUnit]);

    const handleSubmit = async (data: UnitFormValues) => {
        setLoading(true);

        try {
            await updateUnit(unitId, data);
            router.push('/admin/units');
        } catch (error) {
            console.error("Ошибка в updateUnit:", error);
            // Можно добавить уведомление об ошибке
        } finally {
            setLoading(false);
        }
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
