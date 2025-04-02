'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useMovementDishesStore } from '@/lib/store/movement-dishes';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

import {CircleX} from "lucide-react";
import {formatDate} from "@/lib/utils";

const MovementDishesList = () => {
    const { movementsDishes, fetchMovementsDishes, deleteMovementDishes } = useMovementDishesStore();

    useEffect(() => {
        fetchMovementsDishes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Вы действительно хотите удалить это перемещение?")) {
            await deleteMovementDishes(id);
        }
    };


    return (
        <div>
            <Link href="/operations/movement-dishes/new" className="kez-create-item-btn">
                Создать новое перемещение на склад
            </Link>

            <Table>
                <TableCaption className="kez-table-caption">
                    Список перемещений на склады
                </TableCaption>
                <TableHeader>
                    <TableRow className="kez-table-header-row">
                        <TableHead>ID</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Удалить</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {movementsDishes.map((item) => (
                        <TableRow key={item.id} className="kez-table-body-row">
                            <TableCell className="font-medium">
                                <Link href={`/operations/movement-dishes/${item.id}`}>
                                    {item.id}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/operations/movement-dishes/${item.id}`}>
                                    <span>{formatDate(item.date)}</span>
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

export default MovementDishesList;
