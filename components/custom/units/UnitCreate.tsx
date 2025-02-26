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

    interface Errors {
        name_kz: string;
        name_ru: string;
    }

    const [errors, setErrors] = useState<Errors>({
        name_kz: '',
        name_ru: '',
    });

    const { addUnit } = useMeasurementUnitStore();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // очищаем ошибку для изменяемого поля
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        let valid = true;
        const newErrors: Errors = {
            name_kz: '',
            name_ru: '',
        };

        if (!form.name_kz.trim()) {
            newErrors.name_kz = 'Это поле обязательно для заполнения';
            valid = false;
        }
        if (!form.name_ru.trim()) {
            newErrors.name_ru = 'Это поле обязательно для заполнения';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        await addUnit(form);
        router.push('/admin/units');
    };

    return (
        <div>
            <h1>Создание единицы измерения</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название (казахский):</label>
                    <input name="name_kz" value={form.name_kz} onChange={handleChange} />
                    {errors.name_kz && <p style={{ color: 'red' }}>{errors.name_kz}</p>}
                </div>
                <div>
                    <label>Название (русский):</label>
                    <input name="name_ru" value={form.name_ru} onChange={handleChange} />
                    {errors.name_ru && <p style={{ color: 'red' }}>{errors.name_ru}</p>}
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
