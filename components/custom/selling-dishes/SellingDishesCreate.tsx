'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSellingDishesStore } from '@/lib/store/selling-dishes';
import { useWarehouseStore } from '@/lib/store/warehouses';
import { useStudentStore } from '@/lib/store/students';
import { useDishStore } from '@/lib/store/dishes';
import SellingForm from './SellingForm';

const SellingDishesCreate = () => {
    const router = useRouter();
    const { addSellingDishes } = useSellingDishesStore();
    const { warehouses, fetchWarehouses } = useWarehouseStore();
    const { students, fetchStudents } = useStudentStore();
    const { dishes, fetchDishes } = useDishStore();

    const [formData, setFormData] = useState({
        number: '',
        date: '',
        accepted: false,
        warehouse: '',
        student: '',
        amount: 0,
        paid_amount: 0,
        commentary: '',
        selling_dish_items: [] as Array<{
            dish: string;
            quantity: number;
            sale_price: number;
            amount: number;
        }>,
    });

    useEffect(() => {
        fetchWarehouses();
        fetchStudents();
        fetchDishes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleItemChange = (index: number, field: string, value: string) => {
        const updatedItems = [...formData.selling_dish_items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setFormData((prev) => ({ ...prev, selling_dish_items: updatedItems }));
    };

    const handleAddItem = () => {
        setFormData((prev) => ({
            ...prev,
            selling_dish_items: [
                ...prev.selling_dish_items,
                { dish: '', quantity: 0, sale_price: 0, amount: 0 },
            ],
        }));
    };

    const handleRemoveItem = (index: number) => {
        const updatedItems = formData.selling_dish_items.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, selling_dish_items: updatedItems }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            warehouse: Number(formData.warehouse),
            student: Number(formData.student),
            amount: parseFloat(String(formData.amount)),
            paid_amount: parseFloat(String(formData.paid_amount)),
            selling_dish_items: formData.selling_dish_items.map((item) => ({
                dish: Number(item.dish),
                quantity: item.quantity,
                sale_price: item.sale_price,
                amount: item.amount,
            })),
        };

        await addSellingDishes(payload);
        router.push('/operations/selling-dishes');
    };

    return (
        <div>
            <SellingForm
                title="Создать продажу блюд"
                formData={formData}
                setFormData={setFormData}
                warehouses={warehouses}
                students={students}
                dishes={dishes}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                handleItemChange={handleItemChange}
                handleAddItem={handleAddItem}
                handleRemoveItem={handleRemoveItem}
                handleSubmit={handleSubmit}
                submitButtonText="Создать продажу"
            />
        </div>
    );
};

export default SellingDishesCreate;
