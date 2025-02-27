'use client'

import React, { useEffect, useState } from 'react';
import {useParams, useRouter} from 'next/navigation';
import { useIncomingInvoiceStore } from '@/lib/store/incoming-invoices';

const InvoiceEdit = () => {
    const router = useRouter();
    const params = useParams();
    const id = Number(params.id);
    const { selectedIncomingInvoice, fetchIncomingInvoice, updateIncomingInvoice } = useIncomingInvoiceStore();

    // Начальное состояние формы соответствует модели накладной.
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

    useEffect(() => {
        if (id) {
            fetchIncomingInvoice(Number(id));
        }
    }, [id]);

    useEffect(() => {
        if (selectedIncomingInvoice) {
            // При загрузке данных накладной заполняем форму
            setFormData(selectedIncomingInvoice);
        }
    }, [selectedIncomingInvoice]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateIncomingInvoice(Number(id), formData);
        router.push('/incoming-invoices');
    };

    return (
        <div>
            <h1>Редактировать накладную</h1>
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
                {/* Здесь можно добавить остальные поля (warehouse, supplier, amount, shipping_cost, paid_amount и т.д.) */}
                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
};

export default InvoiceEdit;
