'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useMovementDishesStore } from '@/lib/store/movement-dishes';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

import {CheckCheck, CircleOff, CircleX} from "lucide-react";
import {formatDate} from "@/lib/utils";
import useTranslationStore from "@/lib/store/useTranslationStore";

const MovementDishesList = () => {
    const { movementsDishes, fetchMovementsDishes, deleteMovementDishes } = useMovementDishesStore();
    const { t } = useTranslationStore();

    useEffect(() => {
        fetchMovementsDishes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm(t("movement.confirmDeleteMovement"))) {
            await deleteMovementDishes(id);
        }
    };

    return (
        <div>
            <Link href="/operations/movement-dishes/new" className="kez-create-item-btn">
                {t('movement.createNewMovement')}
            </Link>

            <Table>
                <TableCaption className="kez-table-caption">
                    {t('movement.movementsList')}
                </TableCaption>
                <TableHeader>
                    <TableRow className="kez-table-header-row">
                        <TableHead>ID</TableHead>
                        <TableHead>{t('common.date')}</TableHead>
                        <TableHead>{t('common.status')}</TableHead>
                        <TableHead>{t('common.delete')}</TableHead>
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
                            <TableCell>{item.accepted ?
                                <CheckCheck size={18} className="text-green-500"/>:
                                <CircleOff size={18} className="text-gray-500"/>}
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

export default MovementDishesList;
