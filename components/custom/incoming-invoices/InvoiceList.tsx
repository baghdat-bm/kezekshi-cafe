// components/InvoiceList.tsx
'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useIncomingInvoiceStore } from '@/lib/store/incoming-invoices';

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
            <h1>Список приходных накладных</h1>

            <Link href="/operations/invoices/new">
                <b>Создать новую накладную</b>
            </Link>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Номер накладной</th>
                    <th>Дата</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {incomingInvoices.map(invoice => (
                    <tr key={invoice.id}>
                        <td>{invoice.id}</td>
                        <td>
                            <Link href={`/operations/invoices/${invoice.id}`}>
                                <b>{invoice.number}</b>
                            </Link>
                        </td>
                        <td>{invoice.date}</td>
                        <td>{invoice.accepted ? "Принята" : "Не принята"}</td>
                        <td>
                            <button onClick={() => handleDelete(invoice.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
};

export default InvoiceList;
