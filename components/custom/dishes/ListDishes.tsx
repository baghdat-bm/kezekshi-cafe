"use client"

import React, { useEffect } from 'react';
import Link from "next/link";
import { useDishStore } from '@/lib/store/dishes';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {CircleX} from "lucide-react";


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
            <Link href="/admin/dishes/new" className="kez-create-item-btn">
                Создать новое блюдо
            </Link>

            <Table>
                <TableCaption className="kez-table-caption">
                    Список блюд
                </TableCaption>
                <TableHeader>
                    <TableRow className="kez-table-header-row">
                        <TableHead>ID</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Единица измерения</TableHead>
                        <TableHead>Удалить</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dishes.map((item) => (
                        <TableRow key={item.id} className="kez-table-body-row">
                            <TableCell className="font-medium">
                                <Link href={`/admin/dishes/${item.id}`}>
                                    {item.id}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/admin/dishes/${item.id}`}>
                                    {item.name || 'Без названия'}
                                </Link>
                            </TableCell>
                            <TableCell>
                                {getUnitName(item.measurement_unit)}
                            </TableCell>
                            <TableCell className="text-center">
                                <button onClick={() => handleDelete(item.id)}>
                                    <CircleX size={18} className="text-red-500"/>
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ListDishes;
