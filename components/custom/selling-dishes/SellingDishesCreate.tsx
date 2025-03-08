'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSellingDishesStore } from '@/lib/store/selling-dishes';
import { useWarehouseStore } from '@/lib/store/warehouses';
import { useStudentStore } from '@/lib/store/students';
import { useDishStore } from '@/lib/store/dishes';

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
            quantity: string;
            sale_price: string
            amount: string;
        }>,
    });

    useEffect(() => {
        fetchWarehouses();
        fetchStudents();
        fetchDishes();
    }, []);

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
        const updatedItems = [...formData.selling_dish_items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setFormData(prev => ({ ...prev, selling_dish_items: updatedItems }));
    };

    const handleAddItem = () => {
        setFormData(prev => ({
            ...prev,
            selling_dish_items: [
                ...prev.selling_dish_items,
                { dish: '', quantity: '', sale_price: '', amount: '' },
            ],
        }));
    };

    const handleRemoveItem = (index: number) => {
        const updatedItems = formData.selling_dish_items.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, selling_dish_items: updatedItems }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            warehouse: Number(formData.warehouse),
            student: Number(formData.student),
            amount: parseFloat(String(formData.amount)),
            paid_amount: parseFloat(String(formData.paid_amount)),
            selling_dish_items: formData.selling_dish_items.map(item => ({
                dish: Number(item.dish),
                quantity: parseFloat(item.quantity),
                sale_price: parseFloat(item.sale_price),
                amount: parseFloat(item.amount),
            })),
        };

        await addSellingDishes(payload);
        router.push('/operations/selling-dishes');
    };

    return (
        <div>
            <h1>Создать продажу блюд</h1>
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
                    <label>Учащийся:</label>
                    <select name="student" value={formData.student} onChange={handleChange} required>
                        <option value="">Выберите учащегося</option>
                        {students.map(ct => (
                            <option key={ct.id} value={ct.id}>
                                {ct.full_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Сумма:</label>
                    <input type="number" step="0.01" name="amount" value={formData.amount} onChange={handleChange} required />
                </div>
                <div>
                    <label>Оплаченная сумма:</label>
                    <input type="number" step="0.01" name="paid_amount" value={formData.paid_amount} onChange={handleChange} required />
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
                        <th>Цена</th>
                        <th>Сумма</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {formData.selling_dish_items.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <select
                                    value={item.dish}
                                    onChange={(e) => handleItemChange(index, 'dish', e.target.value)}
                                    required
                                >
                                    <option value="">Выберите блюдо</option>
                                    {dishes.map(dish => (
                                        <option key={dish.id} value={dish.id}>
                                            {dish.name_ru || dish.name_en || dish.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={item.sale_price}
                                    onChange={(e) => handleItemChange(index, 'sale_price', e.target.value)}
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={item.amount}
                                    onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                                    required
                                />
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
                    <button type="submit">Создать продажу</button>
                </div>
            </form>
        </div>
    );
};

export default SellingDishesCreate;
