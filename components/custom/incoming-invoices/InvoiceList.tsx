// components/InvoiceList.tsx
'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useIncomingInvoiceStore } from '@/lib/store/incoming-invoices';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatDate} from "@/lib/utils";
import {CheckCheck, CircleOff, CircleX} from "lucide-react";
import useTranslationStore from "@/lib/store/useTranslationStore";

const InvoiceList = () => {
    const { incomingInvoices, fetchIncomingInvoices, deleteIncomingInvoice } = useIncomingInvoiceStore();
    const { t } = useTranslationStore();

    useEffect(() => {
        fetchIncomingInvoices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm(t("incomingInvoice.confirmDeleteInvoice"))) {
            await deleteIncomingInvoice(id);
        }
    };

    return (
        <div>
            <Link href="/operations/incoming-invoices/new" className="kez-create-item-btn">
                {t("incomingInvoice.createNewInvoice")}
            </Link>

            <Table>
                <TableCaption className="kez-table-caption">
                    {t("incomingInvoice.invoicesList")}
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
                    {incomingInvoices.map((item) => (
                        <TableRow key={item.id} className="kez-table-body-row">
                            <TableCell className="font-medium">
                                <Link href={`/operations/incoming-invoices/${item.id}`}>
                                    {item.id}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/operations/incoming-invoices/${item.id}`}>
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

export default InvoiceList;
