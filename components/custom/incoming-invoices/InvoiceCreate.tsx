'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIncomingInvoiceStore } from '@/lib/store/incoming-invoices';

const InvoiceCreate = () => {
    const router = useRouter();
    const { addIncomingInvoice } = useIncomingInvoiceStore();

    const [formData, setFormData] = useState({
        number: '',
        date: '',
        accepted: false,
        warehouse: 0,
        supplier: 0,
        commentary: '',
        amount: 0,
        shipping_cost: 0,
        paid_amount: 0,
        invoice_dish_items: [] as any[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addIncomingInvoice(formData);
        router.push('/incoming-invoices');
    };

    return (
        <div>
            <h1>Создать накладную</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Номер:</label>
                    <input type="text" name="number" value={formData.number} onChange={handleChange} required />
                </div>
                <div>
                    <label>Дата:</label>
                    <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div>
                    <label>Принята:</label>
                    <input type="checkbox" name="accepted" checked={formData.accepted} onChange={handleChange} />
                </div>
                <div>
                    <label>Комментарий:</label>
                    <textarea name="commentary" value={formData.commentary} onChange={handleChange} />
                </div>
                {/* Дополнительные поля для warehouse, supplier, amount, shipping_cost, paid_amount */}
                <button type="submit">Создать</button>
            </form>
        </div>
    );
};

export default InvoiceCreate;
