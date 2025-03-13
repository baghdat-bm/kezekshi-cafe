'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWriteOffFromWarehouseStore } from '@/lib/store/write-off-from-warehouses';
import { useWarehouseStore } from '@/lib/store/warehouses';
import { useWritingOffReasonStore } from '@/lib/store/writing-off-reasons';
import { useDishStore } from '@/lib/store/dishes';
import WriteOffFromWarehouseForm, { WriteOffFormData } from './WriteOffFromWarehouseForm';

const WriteOffFromWarehouseCreate = () => {
    const router = useRouter();
    const { addWriteOffFromWarehouse } = useWriteOffFromWarehouseStore();
    const { warehouses, fetchWarehouses } = useWarehouseStore();
    const { writingOffReasons, fetchWritingOffReasons } = useWritingOffReasonStore();
    const { dishes, fetchDishes } = useDishStore();

    const [formData, setFormData] = useState<WriteOffFormData>({
        number: '',
        date: '',
        accepted: false,
        warehouse: '',
        writing_off_reason: '',
        commentary: '',
        write_off_dish_items: [],
    });

    useEffect(() => {
        fetchWarehouses();
        fetchWritingOffReasons();
        fetchDishes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
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
        const updatedItems = [...formData.write_off_dish_items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setFormData(prev => ({ ...prev, write_off_dish_items: updatedItems }));
    };

    const handleAddItem = () => {
        setFormData(prev => ({
            ...prev,
            write_off_dish_items: [
                ...prev.write_off_dish_items,
                { dish: '', quantity: '' },
            ],
        }));
    };

    const handleRemoveItem = (index: number) => {
        const updatedItems = formData.write_off_dish_items.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, write_off_dish_items: updatedItems }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            warehouse: Number(formData.warehouse),
            writing_off_reason: Number(formData.writing_off_reason),
            write_off_dish_items: formData.write_off_dish_items.map(item => ({
                dish: Number(item.dish),
                quantity: parseFloat(item.quantity),
            })),
        };

        await addWriteOffFromWarehouse(payload);
        router.push('/operations/write-offs');
    };

    return (
        <div>
            <WriteOffFromWarehouseForm
                title="Создать списание со склада"
                submitButtonText="Создать списание"
                formData={formData}
                setFormData={setFormData}
                warehouses={warehouses}
                writingOffReasons={writingOffReasons}
                dishes={dishes}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                handleItemChange={handleItemChange}
                handleAddItem={handleAddItem}
                handleRemoveItem={handleRemoveItem}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default WriteOffFromWarehouseCreate;
