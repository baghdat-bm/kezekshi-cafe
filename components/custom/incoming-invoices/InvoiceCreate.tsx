'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InvoiceForm from '@/components/custom/incoming-invoices/InvoiceForm';
import { useIncomingInvoiceStore } from '@/lib/store/incoming-invoices';
import { useWarehouseStore } from '@/lib/store/warehouses';
import { useContractorStore } from '@/lib/store/contractors';
import { useDishStore } from '@/lib/store/dishes';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';

const InvoiceCreate = () => {
    const router = useRouter();
    const { addIncomingInvoice } = useIncomingInvoiceStore();
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
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

        await addIncomingInvoice(payload);
        router.push('/operations/incoming-invoices');
    };

    return (
        <InvoiceForm
            title="Создать оприходование на склад"
            submitButtonText="Создать оприходование"
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleItemChange={handleItemChange}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
            handleSubmit={handleSubmit}
            contractors={contractors}
            warehouses={warehouses}
            dishes={dishes}
            units={units}
        />
    );
};

export default InvoiceCreate;
