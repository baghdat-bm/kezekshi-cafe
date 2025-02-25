"use client"

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useDishCategoryStore } from '@/lib/store/dish-categories';

const ListCategories = () => {
    const { categories, fetchCategories, deleteCategory } = useDishCategoryStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleDelete = async (id: number) => {
        try {
            await deleteCategory(id);
        } catch (error) {
            console.error('Ошибка при удалении категории:', error);
        }
    };

    return (
        <div>
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
                {categories.map(category => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
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
                        <td>{category.measurement_unit}</td>
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
