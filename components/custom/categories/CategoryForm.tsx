'use client';

import React, { useState, useEffect } from 'react';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

export interface CategoryFormValues {
    id?: number;
    name_kz: string;
    name_ru: string;
    name_en: string;
    logo: string | File;
    color: string;
    measurement_unit: string;
}

interface CategoryFormProps {
    initialValues?: CategoryFormValues;
    onSubmit: (formData: FormData) => Promise<void>;
    onCancel: () => void;
    submitText?: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
                                                       initialValues,
                                                       onSubmit,
                                                       onCancel,
                                                       submitText = 'Сохранить',
                                                   }) => {
    const { units, fetchUnits } = useMeasurementUnitStore();

    useEffect(() => {
        fetchUnits();
    }, [fetchUnits]);

    const [form, setForm] = useState<CategoryFormValues>({
        name_kz: '',
        name_ru: '',
        name_en: '',
        logo: '',
        color: '',
        measurement_unit: '',
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
                logo: initialValues.logo || '',
                color: initialValues.color || '#4e6ee0',
                measurement_unit: initialValues.measurement_unit || '',
                id: initialValues.id,
            });
        }
    }, [initialValues]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

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
        if (form.measurement_unit) {
            formData.append('measurement_unit', form.measurement_unit);
        }
        if (form.id) {
            formData.append('id', String(form.id));
        }

        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            {/* Блок 1: Названия - расположены горизонтально */}
            <div className="flex flex-row gap-6">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Название (каз):</label>
                    <Input
                        type="text"
                        name="name_kz"
                        value={form.name_kz}
                        onChange={handleChange}
                        placeholder="На казахском"
                        className="kez-input"
                        required
                    />
                    {errors.name_kz && <p className="text-red-500 text-xs mt-1">{errors.name_kz}</p>}
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Название (рус):</label>
                    <Input
                        type="text"
                        name="name_ru"
                        value={form.name_ru}
                        onChange={handleChange}
                        placeholder="На русском"
                        className="kez-input"
                        required
                    />
                    {errors.name_ru && <p className="text-red-500 text-xs mt-1">{errors.name_ru}</p>}
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Название (англ):</label>
                    <Input
                        type="text"
                        name="name_en"
                        value={form.name_en}
                        onChange={handleChange}
                        placeholder="На английском"
                        className="kez-input"
                    />
                </div>
            </div>

            {/* Блок 2: Логотип, цвет и единица измерения - расположены горизонтально */}
            <div className="flex flex-row gap-6">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Рисунок:</label>
                    <Input
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="kez-input"
                    />
                    {form.logo && form.logo instanceof File && (
                        <img
                            src={URL.createObjectURL(form.logo)}
                            alt="Превью логотипа"
                            className="mt-2 w-24 h-24 object-cover"
                        />
                    )}
                    {form.logo && typeof form.logo === 'string' && (
                        <img
                            src={form.logo}
                            alt="Логотип категории"
                            className="mt-2 w-24 h-24 object-cover"
                        />
                    )}
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Цвет:</label>
                    <Input
                        type="color"
                        name="color"
                        value={form.color}
                        onChange={handleChange}
                        className="kez-input w-16 p-0"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Единица измерения:</label>
                    <Select
                        value={form.measurement_unit}
                        onValueChange={(value) => setForm({ ...form, measurement_unit: value })}
                    >
                        <SelectTrigger className="kez-input">
                            {form.measurement_unit
                                ? units.find(u => String(u.id) === form.measurement_unit)?.name
                                : 'Выберите'}
                        </SelectTrigger>
                        <SelectContent className="kez-select-content">
                            {units.map((unit) => (
                                <SelectItem key={unit.id} value={String(unit.id)} className="kez-select-item">
                                    {unit.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex gap-4">
                <Button type="submit" className="kez-submit-btn">{submitText}</Button>
                <Button variant="outline" type="button" onClick={onCancel} className="kez-simple-btn mx-2">Отмена</Button>
            </div>
        </form>
    );
};

export default CategoryForm;
