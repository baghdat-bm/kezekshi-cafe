'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useWriteOffFromWarehouseStore } from '@/lib/store/write-off-from-warehouses';
import { useWarehouseStore } from '@/lib/store/warehouses';
import { useWritingOffReasonStore } from '@/lib/store/writing-off-reasons';
import { useDishStore } from '@/lib/store/dishes';
import WriteOffFromWarehouseForm, { WriteOffFormData } from './WriteOffFromWarehouseForm';
import useTranslationStore from "@/lib/store/useTranslationStore";

const WriteOffFromWarehouseEdit = () => {
    const router = useRouter();
    const params = useParams();
    const documentId = params.id;
    const { selectedWriteOffFromWarehouse, fetchWriteOffFromWarehouse, updateWriteOffFromWarehouse } = useWriteOffFromWarehouseStore();
    const { warehouses, fetchWarehouses } = useWarehouseStore();
    const { writingOffReasons, fetchWritingOffReasons } = useWritingOffReasonStore();
    const { dishes, fetchDishes } = useDishStore();
    const { t } = useTranslationStore();

    const [formData, setFormData] = useState<WriteOffFormData>({
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

    useEffect(() => {
        if (documentId) {
            fetchWriteOffFromWarehouse(Number(documentId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [documentId]);

    useEffect(() => {
        if (selectedWriteOffFromWarehouse) {
            setFormData({
                date: selectedWriteOffFromWarehouse.date ? selectedWriteOffFromWarehouse.date.slice(0, 16) : '',
                accepted: selectedWriteOffFromWarehouse.accepted || false,
                warehouse: String(selectedWriteOffFromWarehouse.warehouse) || '',
                writing_off_reason: String(selectedWriteOffFromWarehouse.writing_off_reason) || '',
                commentary: selectedWriteOffFromWarehouse.commentary || '',
                write_off_dish_items: selectedWriteOffFromWarehouse.write_off_dish_items || [],
            });
        }
    }, [selectedWriteOffFromWarehouse]);

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

        await updateWriteOffFromWarehouse(Number(documentId), payload);
        router.push('/operations/write-offs');
    };

    return (
        <div>
            <WriteOffFromWarehouseForm
                title={`${t("writeOff.editWriteOff")} (${documentId})`}
                submitButtonText={t("common.save")}
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

export default WriteOffFromWarehouseEdit;
