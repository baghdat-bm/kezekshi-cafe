'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';

const ContractorEdit = () => {
    const router = useRouter();
    const params = useParams();
    const unitId = Number(params.id);

    const { selectedUnit, fetchUnit, updateUnit } = useMeasurementUnitStore();

    const [form, setForm] = useState({
        id: unitId,
        name_kz: '',
        name_ru: '',
        name_en: '',
    });

    useEffect(() => {
        if (unitId) {
            fetchUnit(unitId);
        }
    }, [unitId, fetchUnit]);

    useEffect(() => {
        if (selectedUnit) {
            setForm({
                id: selectedUnit.id,
                name_kz: selectedUnit.name_kz || '',
                name_ru: selectedUnit.name_ru || '',
                name_en: selectedUnit.name_en || '',
            });
        }
    }, [selectedUnit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateUnit(form.id, form);
        router.push('/units');
    };

    return (
        <div>
            <h1>Редактирование единицы измерения</h1>
            <form onSubmit={handleSubmit}>
                {/* Скрытое поле id */}
                <input type="hidden" name="id" value={form.id} />
                {/* Поле name не отображается */}
                <div>
                    <label>Название (казахский):</label>
                    <input name="name_kz" value={form.name_kz} onChange={handleChange} />
                </div>
                <div>
                    <label>Название (русский):</label>
                    <input name="name_ru" value={form.name_ru} onChange={handleChange} />
                </div>
                <div>
                    <label>Название (английский):</label>
                    <input name="name_en" value={form.name_en} onChange={handleChange} />
                </div>
                <button type="submit">Сохранить изменения</button>
                <button type="button" onClick={() => router.push('/admin/units')}>
                    Отмена
                </button>
            </form>
        </div>
    );
};

export default ContractorEdit;
