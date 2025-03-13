'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useMovementDishesStore } from '@/lib/store/movement-dishes';
import { useWarehouseStore } from '@/lib/store/warehouses';
import { useDishStore } from '@/lib/store/dishes';
import MovementDishesForm, { MovementDishesFormData } from './MovementDishesForm';

const MovementDishesEdit = () => {
    const router = useRouter();
    const params = useParams();
    const documentId = params.id;
    const { selectedMovementDishes, fetchMovementDishes, updateMovementDishes } = useMovementDishesStore();
    const { warehouses, fetchWarehouses } = useWarehouseStore();
    const { dishes, fetchDishes } = useDishStore();

    const [formData, setFormData] = useState<MovementDishesFormData>({
        number: '',
        date: '',
        accepted: false,
        warehouse_from: '',
        warehouse_to: '',
        commentary: '',
        movement_dish_items: [],
    });

    useEffect(() => {
        fetchWarehouses();
        fetchDishes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (documentId) {
            fetchMovementDishes(Number(documentId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [documentId]);

    useEffect(() => {
        if (selectedMovementDishes) {
            setFormData({
                number: selectedMovementDishes.number || '',
                date: selectedMovementDishes.date ? selectedMovementDishes.date.slice(0, 16) : '',
                accepted: selectedMovementDishes.accepted || false,
                warehouse_from: String(selectedMovementDishes.warehouse_from) || '',
                warehouse_to: String(selectedMovementDishes.warehouse_to) || '',
                commentary: selectedMovementDishes.commentary || '',
                movement_dish_items: selectedMovementDishes.movement_dish_items || [],
            });
        }
    }, [selectedMovementDishes]);

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
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleItemChange = (index: number, field: string, value: string) => {
        const updatedItems = [...formData.movement_dish_items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setFormData((prev) => ({ ...prev, movement_dish_items: updatedItems }));
    };

    const handleAddItem = () => {
        setFormData((prev) => ({
            ...prev,
            movement_dish_items: [...prev.movement_dish_items, { dish: '', quantity: '' }],
        }));
    };

    const handleRemoveItem = (index: number) => {
        const updatedItems = formData.movement_dish_items.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, movement_dish_items: updatedItems }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            warehouse_from: Number(formData.warehouse_from),
            warehouse_to: Number(formData.warehouse_to),
            movement_dish_items: formData.movement_dish_items.map((item) => ({
                dish: Number(item.dish),
                quantity: parseFloat(item.quantity),
            })),
        };

        await updateMovementDishes(Number(documentId), payload);
        router.push('/operations/movement-dishes');
    };

    return (
        <div>
            <MovementDishesForm
                title="Редактировать перемещение блюд"
                submitButtonText="Сохранить изменения"
                formData={formData}
                setFormData={setFormData}
                warehouses={warehouses}
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

export default MovementDishesEdit;
