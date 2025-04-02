'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSellingDishesStore } from '@/lib/store/selling-dishes';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatDate} from "@/lib/utils";
import {CircleX, CheckCheck, CircleOff} from "lucide-react";
import useTranslationStore from "@/lib/store/useTranslationStore";

const SellingDishesList = () => {
    const { sellingsDishes, fetchSellingsDishes, deleteSellingDishes } = useSellingDishesStore();
    const { t } = useTranslationStore();

    useEffect(() => {
        fetchSellingsDishes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm(t("selling.confirmDeleteSell"))) {
            await deleteSellingDishes(id);
        }
    };

    return (
        <div>
            <Link href="/operations/selling-dishes/new" className="kez-create-item-btn">
                <b>{t("selling.createNewSell")}</b>
            </Link>

            <Table>
                <TableCaption className="kez-table-caption">
                    {t("selling.sellList")}
                </TableCaption>
                <TableHeader>
                    <TableRow className="kez-table-header-row">
                        <TableHead>ID</TableHead>
                        <TableHead>{t("common.date")}</TableHead>
                        <TableHead>{t("common.status")}</TableHead>
                        <TableHead>{t("common.delete")}</TableHead>
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
                                    <span>{item.date && formatDate(item.date)}</span>
                                </Link>
                            </TableCell>
                            <TableCell>{item.accepted ?
                                <CheckCheck size={18} className="text-green-500"/>:
                                <CircleOff size={18} className="text-gray-500"/>}</TableCell>
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
