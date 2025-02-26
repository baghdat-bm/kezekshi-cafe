'use client';

import React, { useState } from 'react';
import { useDishCategoryStore } from '@/lib/store/dish-categories';
import {useRouter} from "next/navigation";

const CreateCategory = () => {
    const router = useRouter();

    const { addCategory } = useDishCategoryStore();
    const [name_kz, setNameKz] = useState('');
    const [name_ru, setNameRu] = useState('');
    const [name_en, setNameEn] = useState('');
    const [logo, setLogo] = useState('');
    const [color, setColor] = useState('#4e6ee0');
    const [measurementUnit, setMeasurementUnit] = useState('');

    // @ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCategory = {
            name_kz: name_kz,
            name_ru: name_ru,
            name_en: name_en || '',
            logo: logo.trim() !== '' ? logo : undefined,
            color,
            measurement_unit: measurementUnit.trim() !== '' ? Number(measurementUnit) : null,
        };

        try {
            await addCategory(newCategory);
            alert('Категория успешно добавлена!');
            setNameKz('');
            setNameRu('');
            setNameEn('');
            setLogo('');
            setColor('#4e6ee0');
            setMeasurementUnit('');
        } catch (error) {
            console.error('Ошибка при создании категории:', error);
        }
    };

    return (
        <div>
            <h1>Добавить новую категорию</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название (каз): </label>
                    <input type="text" value={name_kz} onChange={(e) => setNameKz(e.target.value)} required />
                </div>
                <div>
                    <label>Название (рус): </label>
                    <input type="text" value={name_ru} onChange={(e) => setNameRu(e.target.value)} required />
                </div>
                <div>
                    <label>Название (англ): </label>
                    <input type="text" value={name_en} onChange={(e) => setNameEn(e.target.value)} required />
                </div>
                <div>
                    <label>Рисунок: </label>
                    <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} />
                </div>
                <div>
                    <label>Цвет: </label>
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                </div>
                <div>
                    <label>Единица измерения: </label>
                    <input
                        type="number"
                        value={measurementUnit}
                        onChange={(e) => setMeasurementUnit(e.target.value)}
                    />
                </div>
                <button type="submit">Добавить категорию</button>
                <button type="button" onClick={() => router.push('/admin/categories')}>
                    Отмена
                </button>
            </form>
        </div>
    );
};

export default CreateCategory;
