"use client"

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useDishCategoryStore } from '@/lib/store/dish-categories';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {CircleX} from "lucide-react";
import useTranslationStore, {Language} from "@/lib/store/useTranslationStore";

const ListCategories = () => {
    const { categories, fetchCategories, deleteCategory } = useDishCategoryStore();
    const { units, fetchUnits } = useMeasurementUnitStore();
    const { language, t } = useTranslationStore();

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
    const getUnitName = (unitId: number | null | undefined, language: Language = 'ru') => {
        if (!unitId) return '-';
        const unit = units.find((u) => u.id === unitId);
        return unit ? unit[`name_${language}`] || unit.name : '-';
    };

    return (
        <div>
            <Link href="/admin/categories/new" className="kez-create-item-btn">
                {t("refs.createNewCategory")}
            </Link>

            <Table>
                <TableCaption className="kez-table-caption">
                    {t("refs.categoriesList")}
                </TableCaption>
                <TableHeader>
                    <TableRow className="kez-table-header-row">
                        <TableHead></TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>{t("common.name")}</TableHead>
                        <TableHead>{t("common.image")}</TableHead>
                        <TableHead>{t("common.units")}</TableHead>
                        <TableHead>{t("common.delete")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((item) => (
                        <TableRow key={item.id} className="kez-table-body-row">
                            <TableCell className="font-medium">
                                <Link href={`/admin/categories/${item.id}`}>
                                    <span className='px-1 mr-1' style={{ background: item.color, color: item.color}}>-</span>
                                </Link>
                            </TableCell>
                            <TableCell className="font-medium">
                                <Link href={`/admin/categories/${item.id}`}>
                                    {item.id}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/admin/categories/${item.id}`}>
                                    {item[`name_${language}`] || t("common.noName")}
                                </Link>
                            </TableCell>
                            <TableCell>
                                {item.logo && (
                                    <Image
                                        src={item.logo}
                                        alt={item.name_ru || t("common.noName")}
                                        width={50}
                                        height={50}
                                        unoptimized={true}
                                    />
                                )}
                            </TableCell>
                            <TableCell>
                                {getUnitName(item.measurement_unit, language)}
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
