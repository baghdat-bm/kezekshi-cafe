'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface UnitFormValues {
    id?: number;
    name_kz: string;
    name_ru: string;
    name_en: string;
}

interface UnitFormProps {
    initialValues?: UnitFormValues;
    onSubmit: (data: UnitFormValues) => Promise<void>;
    onCancel: () => void;
    submitText?: string;
}

const UnitForm: React.FC<UnitFormProps> = ({
                                               initialValues,
                                               onSubmit,
                                               onCancel,
                                               submitText = 'Сохранить',
                                           }) => {
    const [form, setForm] = useState<UnitFormValues>({
        name_kz: '',
        name_ru: '',
        name_en: '',
        ...initialValues,
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
        if (initialValues) {
            setForm({
                name_kz: initialValues.name_kz || '',
                name_ru: initialValues.name_ru || '',
                name_en: initialValues.name_en || '',
                id: initialValues.id,
            });
        }
    }, [initialValues]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
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
        await onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Блок: поля для названий единицы измерения (расположены горизонтально) */}
            <div className="flex flex-row gap-6">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                        Название (казахский):
                    </label>
                    <Input
                        type="text"
                        name="name_kz"
                        value={form.name_kz}
                        onChange={handleChange}
                        placeholder="Введите на казахском"
                        className="kez-input"
                        required
                    />
                    {errors.name_kz && (
                        <p className="text-red-500 text-xs mt-1">{errors.name_kz}</p>
                    )}
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                        Название (русский):
                    </label>
                    <Input
                        type="text"
                        name="name_ru"
                        value={form.name_ru}
                        onChange={handleChange}
                        placeholder="Введите на русском"
                        className="kez-input"
                        required
                    />
                    {errors.name_ru && (
                        <p className="text-red-500 text-xs mt-1">{errors.name_ru}</p>
                    )}
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                        Название (английский):
                    </label>
                    <Input
                        type="text"
                        name="name_en"
                        value={form.name_en}
                        onChange={handleChange}
                        placeholder="Введите на английском"
                        className="kez-input"
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <Button type="submit" className="kez-submit-btn">
                    {submitText}
                </Button>
                <Button
                    variant="outline"
                    type="button"
                    onClick={onCancel}
                    className="kez-simple-btn mx-2"
                >
                    Отмена
                </Button>
            </div>
        </form>
    );
};

export default UnitForm;
