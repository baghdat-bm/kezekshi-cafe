'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';
import UnitDeleteButton from './UnitDeleteButton';

const UnitList = () => {
    const { units, fetchUnits, deleteUnit } = useMeasurementUnitStore();

    useEffect(() => {
        fetchUnits();
    }, [fetchUnits]);

    return (
        <div>
            <h1>Список единиц измерения</h1>
            <Link href="/admin/units/new">Создать новую единицу измерения</Link>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {units.map((unit) => (
                    <tr key={unit.id}>
                        <td>{unit.id}</td>
                        <td>
                            <Link href={`/admin/units/${unit.id}`}>
                                {unit.name_kz || unit.name_ru || unit.name_en || unit.name || 'Без названия'}
                            </Link>
                        </td>
                        <td>
                            <UnitDeleteButton id={unit.id} onDelete={deleteUnit} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UnitList;
