'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useWriteOffFromWarehouseStore } from '@/lib/store/write-off-from-warehouses';
import { useWarehouseStore } from '@/lib/store/warehouses';
import { useDishStore } from '@/lib/store/dishes';
import { useWritingOffReasonStore } from '@/lib/store/writing-off-reasons';

const WritingOffReasonEdit = () => {
    const router = useRouter();
    const params = useParams();
    const documentId = params.id;
    const { selectedWriteOffFromWarehouse, fetchWriteOffFromWarehouse, updateWriteOffFromWarehouse } = useWriteOffFromWarehouseStore();
    const { warehouses, fetchWarehouses } = useWarehouseStore();
    const { writingOffReasons, fetchWritingOffReasons } = useWritingOffReasonStore();
    const { dishes, fetchDishes } = useDishStore();

    const [formData, setFormData] = useState({
        number: '',
        date: '',
        accepted: false,
        warehouse: '',
        writing_off_reason: '',
        commentary: '',
        write_off_dish_items: [] as Array<{
            dish: string;
            quantity: string;
        }>,
    });

    useEffect(() => {
        fetchWarehouses();
        fetchWritingOffReasons();
        fetchDishes();
    }, []);

    useEffect(() => {
        if (documentId) {
            fetchWriteOffFromWarehouse(Number(documentId));
        }
    }, [documentId]);

    useEffect(() => {
        if (selectedWriteOffFromWarehouse) {
            setFormData({
                number: selectedWriteOffFromWarehouse.number || '',
                // Приводим дату к формату datetime-local (например, "2025-02-21T10:30")
                date: selectedWriteOffFromWarehouse.date ? selectedWriteOffFromWarehouse.date.slice(0, 16) : '',
                accepted: selectedWriteOffFromWarehouse.accepted || false,
                warehouse: String(selectedWriteOffFromWarehouse.warehouse) || '',
                writing_off_reason: String(selectedWriteOffFromWarehouse.writing_off_reason) || '',
                commentary: selectedWriteOffFromWarehouse.commentary || '',
                movement_dishes_dish_item: selectedWriteOffFromWarehouse.write_off_dish_items || [],
            });
        }
    }, [selectedWriteOffFromWarehouse]);

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
        const updatedItems = [...formData.write_off_dish_items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setFormData(prev => ({ ...prev, movement_dishes_dish_item: updatedItems }));
    };

    const handleAddItem = () => {
        setFormData(prev => ({
            ...prev,
            movement_dishes_dish_item: [
                ...prev.write_off_dish_items,
                { dish: '', quantity: '' },
            ],
        }));
    };

    const handleRemoveItem = (index: number) => {
        const updatedItems = formData.write_off_dish_items.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, movement_dishes_dish_item: updatedItems }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            warehouse: Number(formData.warehouse),
            writing_off_reason: Number(formData.writing_off_reason),
            invoice_dish_items: formData.write_off_dish_items.map(item => ({
                dish: Number(item.dish),
                quantity: parseFloat(item.quantity),
            })),
        };

        await updateWriteOffFromWarehouse(Number(documentId), payload);
        router.push('/operations/write-offs');
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
                    <label>Причина списания:</label>
                    <select name="writing_off_reason" value={formData.writing_off_reason} onChange={handleChange} required>
                        <option value="">Выберите причину</option>
                        {writingOffReasons.map(ct => (
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

                <h2>Позиции списания</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Блюдо</th>
                        <th>Количество</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {formData.write_off_dish_items.map((item, index) => (
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
                    Добавить позицию
                </button>
                <div>
                    <button type="submit">Сохранить изменения</button>
                </div>
            </form>
        </div>
    );
};

export default WritingOffReasonEdit;
