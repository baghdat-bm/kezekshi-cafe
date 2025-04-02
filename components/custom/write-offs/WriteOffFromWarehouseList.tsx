// components/SellingDishesList.tsx
'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useWriteOffFromWarehouseStore } from '@/lib/store/write-off-from-warehouses';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {CircleX} from "lucide-react";
import {formatDate} from "@/lib/utils";

const WriteOffFromWarehouseList = () => {
    const { writeOffFromWarehouses, fetchWriteOffFromWarehouses, deleteWriteOffFromWarehouse } = useWriteOffFromWarehouseStore();

    useEffect(() => {
        fetchWriteOffFromWarehouses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Вы действительно хотите удалить это списание?")) {
            await deleteWriteOffFromWarehouse(id);
        }
    };

    return (
        <div>
            <Link href="/operations/write-offs/new" className="kez-create-item-btn">
                Создать новое списание со склада
            </Link>


            <Table>
                <TableCaption className="kez-table-caption">
                    Список списаний со складов
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
                    {writeOffFromWarehouses.map((item) => (
                        <TableRow key={item.id} className="kez-table-body-row">
                            <TableCell className="font-medium">
                                <Link href={`/operations/write-offs/${item.id}`}>
                                    {item.id}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/operations/write-offs/${item.id}`}>
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

export default WriteOffFromWarehouseList;
