"use client"

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useDishStore } from '@/lib/store/dishes';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';

const ListDishes = () => {
    const { dishes, fetchDishes, deleteDish } = useDishStore();
    const { units, fetchUnits } = useMeasurementUnitStore();

    useEffect(() => {
        fetchDishes();
        fetchUnits();
    }, [fetchDishes, fetchUnits]);

    const handleDelete = async (id: number) => {
        const isConfirmed = window.confirm("Вы уверены, что хотите удалить это блюдо?");
        if (!isConfirmed) return;
        try {
            await deleteDish(id);
        } catch (error) {
            console.error('Ошибка при удалении блюда:', error);
        }
    };

    // Функция для получения названия единицы измерения по id
    const getUnitName = (unitId: number | null | undefined) => {
        if (!unitId) return '-';
        const unit = units.find((u) => u.id === unitId);
        return unit ? unit.name_ru || unit.name : '-';
    };

    return (
        <div>
            <h1>Список блюд</h1>
            <Link href="/admin/dishes/new">Создать новое блюдо</Link>
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
                {dishes.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                            <Link href={`/admin/dishes/${item.id}`}>
                                {item.name || 'Без названия'}
                            </Link>
                        </td>
                        <td>
                            {item.logo && (
                                <Image
                                    src={item.logo}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                />
                            )}
                        </td>
                        <td style={{ backgroundColor: item.color }}>{item.color}</td>
                        <td>{getUnitName(item.measurement_unit)}</td>
                        <td>
                            <button onClick={() => handleDelete(item.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListDishes;
