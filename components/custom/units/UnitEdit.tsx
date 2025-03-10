'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';
import UnitForm, { UnitFormValues } from './UnitForm';

const UnitEdit = () => {
    const router = useRouter();
    const params = useParams();
    const unitId = Number(params.id);

    const { selectedUnit, fetchUnit, updateUnit } = useMeasurementUnitStore();

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
        return <div>Загрузка...</div>;
    }

    const initialValues: UnitFormValues = {
        id: selectedUnit.id,
        name_kz: selectedUnit.name_kz || '',
        name_ru: selectedUnit.name_ru || '',
        name_en: selectedUnit.name_en || '',
    };

    return (
        <div>
            <h1>Редактирование единицы измерения</h1>
            <UnitForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitText="Сохранить изменения"
            />
        </div>
    );
};

export default UnitEdit;
