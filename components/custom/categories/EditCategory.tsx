'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDishCategoryStore } from '@/lib/store/dish-categories';

const CategoryEdit = () => {
    const router = useRouter();
    const params = useParams();
    const categoryId = Number(params.id);

    const { selectedCategory, fetchCategory, updateCategory } = useDishCategoryStore();

    const [form, setForm] = useState({
        id: categoryId,
        name_kz: '',
        name_ru: '',
        name_en: '',
        logo: '',
        color: '#4e6ee0',
        measurement_unit: 0,
    });

    interface Errors {
        name_kz: string;
        name_ru: string;
    }

    const [errors, setErrors] = useState<Errors>({
        name_kz: '',
        name_ru: '',
    });

    useEffect(() => {
        if (categoryId) {
            fetchCategory(categoryId);
        }
    }, [categoryId, fetchCategory]);

    useEffect(() => {
        if (selectedCategory) {
            setForm({
                id: selectedCategory.id,
                name_kz: selectedCategory.name_kz || '',
                name_ru: selectedCategory.name_ru || '',
                name_en: selectedCategory.name_en || '',
                logo: selectedCategory.logo || '',
                color: selectedCategory.color || '',
                measurement_unit: selectedCategory.measurement_unit || 0,
            });
        }
    }, [selectedCategory]);

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
        await updateCategory(form.id, form);
        router.push('/admin/categories');
    };

    return (
        <div>
            <h1>Редактирование категории блюда</h1>
            <form onSubmit={handleSubmit}>
                {/* Скрытое поле id */}
                <input type="hidden" name="id" value={form.id} />
                {/* Поле name не отображается */}
                <div>
                    <label>Название (каз.):</label>
                    <input name="name_kz" value={form.name_kz} onChange={handleChange} />
                    {errors.name_kz && <p style={{ color: 'red' }}>{errors.name_kz}</p>}
                </div>
                <div>
                    <label>Название (рус.):</label>
                    <input name="name_ru" value={form.name_ru} onChange={handleChange} />
                    {errors.name_ru && <p style={{ color: 'red' }}>{errors.name_ru}</p>}
                </div>
                <div>
                    <label>Название (англ.):</label>
                    <input name="name_en" value={form.name_en} onChange={handleChange} />
                </div>
                <div>
                    <label>Рисунок:</label>
                    <input name="logo" value={form.logo} onChange={handleChange} />
                </div>
                <div>
                    <label>Цвет:</label>
                    <input type="color" name="color" value={form.color} onChange={handleChange} />
                </div>
                <div>
                    <label>Единица измерения:</label>
                    <input name="measurement_unit" value={form.measurement_unit} onChange={handleChange} />
                </div>
                <button type="submit">Сохранить изменения</button>
                <button type="button" onClick={() => router.push('/admin/categories')}>
                    Отмена
                </button>
            </form>
        </div>
    );
};

export default CategoryEdit;
