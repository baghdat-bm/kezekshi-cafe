"use client"

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useDishCategoryStore } from '@/lib/store/dish-categories';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {CircleX} from "lucide-react";

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
    const getUnitName = (unitId: number | null | undefined) => {
        if (!unitId) return '-';
        const unit = units.find((u) => u.id === unitId);
        return unit ? unit.name_ru || unit.name : '-';
    };

    return (
        <div>
            <Link href="/admin/categories/new" className="kez-create-item-btn">
                Создать новую категорию блюд
            </Link>

            <Table>
                <TableCaption className="kez-table-caption">
                    Список категории блюд
                </TableCaption>
                <TableHeader>
                    <TableRow className="kez-table-header-row">
                        <TableHead>ID</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Логотип</TableHead>
                        <TableHead>Цвет</TableHead>
                        <TableHead>Единица измерения</TableHead>
                        <TableHead>Удалить</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((item) => (
                        <TableRow key={item.id} className="kez-table-body-row text-gray-100"
                                  style={{ backgroundColor: item.color }}>
                            <TableCell className="font-medium">
                                <Link href={`/admin/categories/${item.id}`}>
                                    {item.id}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/admin/categories/${item.id}`}>
                                    {item.name || 'Без названия'}
                                </Link>
                            </TableCell>
                            <TableCell>
                                {item.logo && (
                                    <Image
                                        src={item.logo}
                                        alt={item.name}
                                        width={50}
                                        height={50}
                                    />
                                )}
                            </TableCell>
                            <TableCell>
                                {item.color}
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

export default ListCategories;
