'use client';

import React, { useState, useEffect } from 'react';
import { useDishCategoryStore } from '@/lib/store/dish-categories';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';
import { useRouter } from 'next/navigation';

const CreateCategory = () => {
    const router = useRouter();
    const { addCategory } = useDishCategoryStore();
    const { units, fetchUnits } = useMeasurementUnitStore();

    // Загружаем единицы измерения при монтировании компонента
    useEffect(() => {
        fetchUnits();
    }, [fetchUnits]);

    const [form, setForm] = useState({
        name_kz: '',
        name_ru: '',
        name_en: '',
        logo: '' as string | File,
        color: '#4e6ee0',
        measurement_unit: '', // будем хранить id единицы измерения как строку
    });

    interface Errors {
        name_kz: string;
        name_ru: string;
    }

    const [errors, setErrors] = useState<Errors>({
        name_kz: '',
        name_ru: '',
    });

    // Обработчик для текстовых и select полей
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    // Обработчик для выбора файла
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setForm({ ...form, logo: file });
        }
    };

    const validate = () => {
        let valid = true;
        const newErrors: Errors = { name_kz: '', name_ru: '' };

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

        const formData = new FormData();
        formData.append('name_kz', form.name_kz);
        formData.append('name_ru', form.name_ru);
        formData.append('name_en', form.name_en);
        if (form.logo instanceof File) {
            formData.append('logo', form.logo);
        } else if (typeof form.logo === 'string' && form.logo.trim() !== '') {
            formData.append('logo', form.logo);
        }
        formData.append('color', form.color);
        // Если выбрана единица измерения, добавляем ее id
        if (form.measurement_unit !== '') {
            formData.append('measurement_unit', form.measurement_unit);
        }

        try {
            await addCategory(formData);
            alert('Категория успешно добавлена!');
            router.push('/admin/categories');
        } catch (error) {
            console.error('Ошибка при создании категории:', error);
        }
    };

    return (
        <div>
            <h1>Добавить новую категорию</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Название (каз): </label>
                    <input
                        type="text"
                        name="name_kz"
                        value={form.name_kz}
                        onChange={handleChange}
                        required
                    />
                    {errors.name_kz && <p style={{ color: 'red' }}>{errors.name_kz}</p>}
                </div>
                <div>
                    <label>Название (рус): </label>
                    <input
                        type="text"
                        name="name_ru"
                        value={form.name_ru}
                        onChange={handleChange}
                        required
                    />
                    {errors.name_ru && <p style={{ color: 'red' }}>{errors.name_ru}</p>}
                </div>
                <div>
                    <label>Название (англ): </label>
                    <input
                        type="text"
                        name="name_en"
                        value={form.name_en}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Рисунок: </label>
                    <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {form.logo && form.logo instanceof File && (
                        <img
                            src={URL.createObjectURL(form.logo)}
                            alt="Превью логотипа"
                            width="100"
                        />
                    )}
                    {form.logo && typeof form.logo === 'string' && (
                        <img src={form.logo} alt="Логотип категории" width="100" />
                    )}
                </div>
                <div>
                    <label>Цвет: </label>
                    <input
                        type="color"
                        name="color"
                        value={form.color}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Единица измерения:</label>
                    <select
                        name="measurement_unit"
                        value={form.measurement_unit}
                        onChange={handleChange}
                    >
                        <option value="">Выберите единицу измерения</option>
                        {units.map((unit) => (
                            <option key={unit.id} value={unit.id}>
                                {unit.name}
                            </option>
                        ))}
                    </select>
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
