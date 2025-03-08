'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useMovementDishesStore } from '@/lib/store/movement-dishes';
import { useWarehouseStore } from '@/lib/store/warehouses';
import { useDishStore } from '@/lib/store/dishes';

const MovementDishesEdit = () => {
    const router = useRouter();
    const params = useParams();
    const documentId = params.id;
    const { selectedMovementDishes, fetchMovementDishes, updateMovementDishes } = useMovementDishesStore();
    const { warehouses, fetchWarehouses } = useWarehouseStore();
    const { dishes, fetchDishes } = useDishStore();

    const [formData, setFormData] = useState({
        number: '',
        date: '',
        accepted: false,
        warehouse_from: '',
        warehouse_to: '',
        commentary: '',
        movement_dish_items: [] as Array<{
            dish: string;
            quantity: string;
        }>,
    });

    useEffect(() => {
        fetchWarehouses();
        fetchDishes();
    }, []);

    useEffect(() => {
        if (documentId) {
            fetchMovementDishes(Number(documentId));
        }
    }, [documentId]);

    useEffect(() => {
        if (selectedMovementDishes) {
            setFormData({
                number: selectedMovementDishes.number || '',
                // Приводим дату к формату datetime-local (например, "2025-02-21T10:30")
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
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleItemChange = (index: number, field: string, value: string) => {
        const updatedItems = [...formData.movement_dish_items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setFormData(prev => ({ ...prev, movement_dish_items: updatedItems }));
    };

    const handleAddItem = () => {
        setFormData(prev => ({
            ...prev,
            movement_dish_items: [
                ...prev.movement_dish_items,
                { dish: '', quantity: '' },
            ],
        }));
    };

    const handleRemoveItem = (index: number) => {
        const updatedItems = formData.movement_dish_items.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, movement_dish_items: updatedItems }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            warehouse_from: Number(formData.warehouse_from),
            warehouse_to: Number(formData.warehouse_to),
            invoice_dish_items: formData.movement_dish_items.map(item => ({
                dish: Number(item.dish),
                quantity: parseFloat(item.quantity),
            })),
        };

        await updateMovementDishes(Number(documentId), payload);
        router.push('/operations/movement-dishes');
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
                    <label>Склад отправитель:</label>
                    <select name="warehouse_from" value={formData.warehouse_from} onChange={handleChange} required>
                        <option value="">Выберите склад</option>
                        {warehouses.map(wh => (
                            <option key={wh.id} value={wh.id}>
                                {wh.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Склад получатель:</label>
                    <select name="warehouse_to" value={formData.warehouse_to} onChange={handleChange} required>
                        <option value="">Выберите склад</option>
                        {warehouses.map(ct => (
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

                <h2>Блюда</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Блюдо</th>
                        <th>Количество</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {formData.movement_dish_items.map((item, index) => (
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
                                <button type="button" onClick={() => handleRemoveItem(index)}>
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button type="button" onClick={handleAddItem}>
                    Добавить блюдо
                </button>
                <div>
                    <button type="submit">Сохранить изменения</button>
                </div>
            </form>
        </div>
    );
};

export default MovementDishesEdit;
