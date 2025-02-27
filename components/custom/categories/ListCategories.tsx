"use client"

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useDishCategoryStore } from '@/lib/store/dish-categories';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';

const ListCategories = () => {
    const { categories, fetchCategories, deleteCategory } = useDishCategoryStore();
    const { units, fetchUnits } = useMeasurementUnitStore();

    useEffect(() => {
        fetchCategories();
        fetchUnits();
    }, [fetchCategories, fetchUnits]);

    const handleDelete = async (id: number) => {
        const isConfirmed = window.confirm("Вы уверены, что хотите удалить эту категорию?");
        if (!isConfirmed) return;
        try {
            await deleteCategory(id);
        } catch (error) {
            console.error('Ошибка при удалении категории:', error);
        }
    };

    // Функция для получения названия единицы измерения по id
    const getUnitName = (unitId: number | null) => {
        if (!unitId) return '-';
        const unit = units.find((u) => u.id === unitId);
        return unit ? unit.name_ru || unit.name : '-';
    };

    return (
        <div>
            <h1>Список категории блюд</h1>
            <Link href="/admin/categories/new">Создать новую категорию блюд</Link>
            <table cellPadding="5" className="table-none md:table-fixed">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Логотип</th>
                    <th>Цвет</th>
                    <th>Единица измерения</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>
                            <Link href={`/admin/categories/${category.id}`}>
                                {category.name || 'Без названия'}
                            </Link>
                        </td>
                        <td>
                            {category.logo && (
                                <Image
                                    src={category.logo}
                                    alt={category.name}
                                    width={50}
                                    height={50}
                                />
                            )}
                        </td>
                        <td style={{ backgroundColor: category.color }}>{category.color}</td>
                        <td>{getUnitName(category.measurement_unit)}</td>
                        <td>
                            <button onClick={() => handleDelete(category.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListCategories;
