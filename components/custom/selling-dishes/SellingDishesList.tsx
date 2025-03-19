'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSellingDishesStore } from '@/lib/store/selling-dishes';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatDate} from "@/lib/utils";
import {CircleX} from "lucide-react";

const SellingDishesList = () => {
    const { sellingsDishes, fetchSellingsDishes, deleteSellingDishes } = useSellingDishesStore();

    useEffect(() => {
        fetchSellingsDishes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Вы действительно хотите удалить эту продажу?")) {
            await deleteSellingDishes(id);
        }
    };

    return (
        <div>
            <Link href="/operations/selling-dishes/new" className="kez-create-item-btn">
                <b>Создать новую продажу блюд</b>
            </Link>

            <Table>
                <TableCaption className="kez-table-caption">
                    Список продаж блюд
                </TableCaption>
                <TableHeader>
                    <TableRow className="kez-table-header-row">
                        <TableHead>ID</TableHead>
                        <TableHead>Номер</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Удалить</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sellingsDishes.map((item) => (
                        <TableRow key={item.id} className="kez-table-body-row">
                            <TableCell className="font-medium">
                                <Link href={`/operations/selling-dishes/${item.id}`}>
                                    {item.id}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/operations/selling-dishes/${item.id}`}>
                                    {item.number}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/operations/selling-dishes/${item.id}`}>
                                    <span>{item.date && formatDate(item.date)}</span>
                                </Link>
                            </TableCell>
                            <TableCell>{item.accepted ? "Принята" : "Не принята"}</TableCell>
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

export default SellingDishesList;
