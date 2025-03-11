// components/InvoiceList.tsx
'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useIncomingInvoiceStore } from '@/lib/store/incoming-invoices';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatDate} from "@/lib/utils";
import {CircleX} from "lucide-react";

const InvoiceList = () => {
    const { incomingInvoices, fetchIncomingInvoices, deleteIncomingInvoice } = useIncomingInvoiceStore();

    useEffect(() => {
        fetchIncomingInvoices();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Вы действительно хотите удалить накладную?")) {
            await deleteIncomingInvoice(id);
        }
    };

    return (
        <div>
            <Link href="/operations/incoming-invoices/new" className="kez-create-item-btn">
                Создать новое оприходование на склад
            </Link>

            <Table>
                <TableCaption className="kez-table-caption">
                    Список оприходований на склады
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
                    {incomingInvoices.map((item) => (
                        <TableRow key={item.id} className="kez-table-body-row">
                            <TableCell className="font-medium">
                                <Link href={`/operations/incoming-invoices/${item.id}`}>
                                    {item.id}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/operations/incoming-invoices/${item.id}`}>
                                    {item.number}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/operations/incoming-invoices/${item.id}`}>
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

export default InvoiceList;
