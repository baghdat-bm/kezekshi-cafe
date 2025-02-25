'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';

const UnitCreate = () => {
    const [form, setForm] = useState({
        name_kz: '',
        name_ru: '',
        name_en: '',
    });

    const { addUnit } = useMeasurementUnitStore();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addUnit(form);
        router.push('/units');
    };

    return (
        <div>
            <h1>Создание единицы измерения</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Создать</button>
                <button type="button" onClick={() => router.push('/admin/units')}>
                    Отмена
                </button>
            </form>
        </div>
    );
};

export default UnitCreate;
