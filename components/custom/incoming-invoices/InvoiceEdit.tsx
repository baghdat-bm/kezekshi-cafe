'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useIncomingInvoiceStore } from '@/lib/store/incoming-invoices';
import { useWarehouseStore } from '@/lib/store/warehouses';
import { useContractorStore } from '@/lib/store/contractors';
import { useDishStore } from '@/lib/store/dishes';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';

const InvoiceEdit = () => {
    const router = useRouter();
    const params = useParams();
    const invoiceId = params.id;
    const { selectedIncomingInvoice, fetchIncomingInvoice, updateIncomingInvoice } = useIncomingInvoiceStore();
    const { warehouses, fetchWarehouses } = useWarehouseStore();
    const { contractors, fetchContractors } = useContractorStore();
    const { dishes, fetchDishes } = useDishStore();
    const { units, fetchUnits } = useMeasurementUnitStore();

    const [formData, setFormData] = useState({
        number: '',
        date: '',
        accepted: false,
        warehouse: '',
        supplier: '',
        commentary: '',
        amount: 0,
        shipping_cost: 0,
        paid_amount: 0,
        invoice_dish_items: [] as Array<{
            dish: string;
            quantity: string;
            measurement_unit: string;
            cost_price: string;
            sale_price: string;
        }>,
    });

    useEffect(() => {
        fetchWarehouses();
        fetchContractors();
        fetchDishes();
        fetchUnits();
    }, []);

    useEffect(() => {
        if (invoiceId) {
            fetchIncomingInvoice(Number(invoiceId));
        }
    }, [invoiceId]);

    useEffect(() => {
        if (selectedIncomingInvoice) {
            setFormData({
                number: selectedIncomingInvoice.number || '',
                // Приводим дату к формату datetime-local (например, "2025-02-21T10:30")
                date: selectedIncomingInvoice.date ? selectedIncomingInvoice.date.slice(0, 16) : '',
                accepted: selectedIncomingInvoice.accepted || false,
                warehouse: String(selectedIncomingInvoice.warehouse) || '',
                supplier: String(selectedIncomingInvoice.supplier) || '',
                commentary: selectedIncomingInvoice.commentary || '',
                amount: selectedIncomingInvoice.amount || 0,
                shipping_cost: selectedIncomingInvoice.shipping_cost || 0,
                paid_amount: selectedIncomingInvoice.paid_amount || 0,
                invoice_dish_items: selectedIncomingInvoice.invoice_dish_items || [],
            });
        }
    }, [selectedIncomingInvoice]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleItemChange = (index: number, field: string, value: string) => {
        const updatedItems = [...formData.invoice_dish_items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setFormData(prev => ({ ...prev, invoice_dish_items: updatedItems }));
    };

    const handleAddItem = () => {
        setFormData(prev => ({
            ...prev,
            invoice_dish_items: [
                ...prev.invoice_dish_items,
                { dish: '', quantity: '', measurement_unit: '', cost_price: '', sale_price: '' },
            ],
        }));
    };

    const handleRemoveItem = (index: number) => {
        const updatedItems = formData.invoice_dish_items.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, invoice_dish_items: updatedItems }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            warehouse: Number(formData.warehouse),
            supplier: Number(formData.supplier),
            amount: parseFloat(String(formData.amount)),
            shipping_cost: parseFloat(String(formData.shipping_cost)),
            paid_amount: parseFloat(String(formData.paid_amount)),
            invoice_dish_items: formData.invoice_dish_items.map(item => ({
                dish: Number(item.dish),
                quantity: parseFloat(item.quantity),
                measurement_unit: Number(item.measurement_unit),
                cost_price: parseFloat(item.cost_price),
                sale_price: parseFloat(item.sale_price),
            })),
        };

        await updateIncomingInvoice(Number(invoiceId), payload);
        router.push('/operations/incoming-invoices');
    };

    return (
        <div>
            <h1>Редактировать накладную</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Номер накладной:</label>
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
                    <label>Склад:</label>
                    <select name="warehouse" value={formData.warehouse} onChange={handleChange} required>
                        <option value="">Выберите склад</option>
                        {warehouses.map(wh => (
                            <option key={wh.id} value={wh.id}>
                                {wh.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Поставщик:</label>
                    <select name="supplier" value={formData.supplier} onChange={handleChange} required>
                        <option value="">Выберите поставщика</option>
                        {contractors.map(ct => (
                            <option key={ct.id} value={ct.id}>
                                {ct.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Комментарий:</label>
                    <textarea name="commentary" value={formData.commentary} onChange={handleChange} />
                </div>
                <div>
                    <label>Сумма:</label>
                    <input type="number" step="0.01" name="amount" value={formData.amount} onChange={handleChange} required />
                </div>
                <div>
                    <label>Стоимость доставки:</label>
                    <input type="number" step="0.01" name="shipping_cost" value={formData.shipping_cost} onChange={handleChange} required />
                </div>
                <div>
                    <label>Оплаченная сумма:</label>
                    <input type="number" step="0.01" name="paid_amount" value={formData.paid_amount} onChange={handleChange} required />
                </div>

                <h2>Позиции накладной</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Блюдо</th>
                        <th>Количество</th>
                        <th>Ед. измерения</th>
                        <th>Себестоимость</th>
                        <th>Цена продажи</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {formData.invoice_dish_items.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <select value={item.dish} onChange={(e) => handleItemChange(index, 'dish', e.target.value)} required>
                                    <option value="">Выберите блюдо</option>
                                    {dishes.map(dish => (
                                        <option key={dish.id} value={dish.id}>
                                            {dish.name_ru || dish.name_en || dish.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input type="number" step="0.01" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} required />
                            </td>
                            <td>
                                <select value={item.measurement_unit} onChange={(e) => handleItemChange(index, 'measurement_unit', e.target.value)} required>
                                    <option value="">Выберите единицу измерения</option>
                                    {units.map(unit => (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.name_ru || unit.name_en || unit.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input type="number" step="0.01" value={item.cost_price} onChange={(e) => handleItemChange(index, 'cost_price', e.target.value)} required />
                            </td>
                            <td>
                                <input type="number" step="0.01" value={item.sale_price} onChange={(e) => handleItemChange(index, 'sale_price', e.target.value)} required />
                            </td>
                            <td>
                                <button type="button" onClick={() => handleRemoveItem(index)}>
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button type="button" onClick={handleAddItem}>
                    Добавить позицию
                </button>
                <div>
                    <button type="submit">Сохранить изменения</button>
                </div>
            </form>
        </div>
    );
};

export default InvoiceEdit;
