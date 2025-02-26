// components/custom/units/UnitEdit.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';

const UnitEdit = () => {
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

    interface Errors {
        name_kz: string;
        name_ru: string;
        name_en: string;
    }

    const [errors, setErrors] = useState<Errors>({
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
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        let valid = true;
        const newErrors: Errors = {
            name_kz: '',
            name_ru: '',
            name_en: '',
        };

        if (!form.name_kz.trim()) {
            newErrors.name_kz = 'Это поле обязательно для заполнения';
            valid = false;
        }
        if (!form.name_ru.trim()) {
            newErrors.name_ru = 'Это поле обязательно для заполнения';
            valid = false;
        }
        if (!form.name_en.trim()) {
            newErrors.name_en = 'Это поле обязательно для заполнения';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        await updateUnit(form.id, form);
        router.push('/admin/units');
    };

    return (
        <div>
            <h1>Редактирование единицы измерения</h1>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={form.id} />
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
                    {errors.name_en && <p style={{ color: 'red' }}>{errors.name_en}</p>}
                </div>
                <button type="submit">Сохранить изменения</button>
                <button type="button" onClick={() => router.push('/admin/units')}>
                    Отмена
                </button>
            </form>
        </div>
    );
};

export default UnitEdit;
