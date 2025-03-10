'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSellingDishesStore } from '@/lib/store/selling-dishes';
import { useWarehouseStore } from '@/lib/store/warehouses';
import { useStudentStore } from '@/lib/store/students';
import { useDishStore } from '@/lib/store/dishes';
import SellingForm from './SellingForm';

const SellingDishesEdit = () => {
    const router = useRouter();
    const params = useParams();
    const documentId = params.id;
    const { selectedSellingDishes, fetchSellingDishes, updateSellingDishes } = useSellingDishesStore();
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
            quantity: string;
            sale_price: string;
            amount: string;
        }>,
    });

    useEffect(() => {
        fetchWarehouses();
        fetchStudents();
        fetchDishes();
    }, []);

    useEffect(() => {
        if (documentId) {
            fetchSellingDishes(Number(documentId));
        }
    }, [documentId]);

    useEffect(() => {
        if (selectedSellingDishes) {
            setFormData({
                number: selectedSellingDishes.number || '',
                date: selectedSellingDishes.date ? selectedSellingDishes.date.slice(0, 16) : '',
                accepted: selectedSellingDishes.accepted || false,
                warehouse: String(selectedSellingDishes.warehouse) || '',
                student: String(selectedSellingDishes.student) || '',
                amount: selectedSellingDishes.amount || 0,
                paid_amount: selectedSellingDishes.paid_amount || 0,
                commentary: selectedSellingDishes.commentary || '',
                selling_dish_items: selectedSellingDishes.selling_dish_items || [],
            });
        }
    }, [selectedSellingDishes]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
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
                { dish: '', quantity: '', sale_price: '', amount: '' },
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
                quantity: parseFloat(item.quantity),
                sale_price: parseFloat(item.sale_price),
                amount: parseFloat(item.amount),
            })),
        };

        await updateSellingDishes(Number(documentId), payload);
        router.push('/operations/selling-dishes');
    };

    return (
        <div>
            <SellingForm
                title="Редактировать продажу блюд"
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
                submitButtonText="Сохранить изменения"
            />
        </div>
    );
};

export default SellingDishesEdit;
