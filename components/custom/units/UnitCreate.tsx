'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';
import UnitForm, { UnitFormValues } from './UnitForm';

const UnitCreate = () => {
    const router = useRouter();
    const { addUnit } = useMeasurementUnitStore();

    const handleSubmit = async (data: UnitFormValues) => {
        await addUnit(data);
        router.push('/admin/units');
    };

    const handleCancel = () => {
        router.push('/admin/units');
    };

    return (
        <div>
            <h1>Создание единицы измерения</h1>
            <UnitForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitText="Создать"
            />
        </div>
    );
};

export default UnitCreate;
