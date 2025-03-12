"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import SelectDish from "@/components/custom/dishes/SelectDish";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";

export type DishItem = {
    dish: string;
    quantity: number;
    sale_price: number;
    amount: number;
};

export type SellingFormData = {
    number: string;
    date: string;
    accepted: boolean;
    warehouse: string;
    student: string;
    commentary: string;
    amount: number;
    paid_amount: number;
    selling_dish_items: DishItem[];
};

type SellingFormProps = {
    title: string;
    submitButtonText: string;
    formData: SellingFormData;
    setFormData: React.Dispatch<React.SetStateAction<SellingFormData>>;
    warehouses: Array<{ id: number; name: string }>;
    students: Array<{ id: number; full_name: string }>;
    dishes: any[];
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSelectChange: (name: string, value: string) => void;
    handleItemChange: (index: number, field: string, value: string) => void;
    handleAddItem: () => void;
    handleRemoveItem: (index: number) => void;
    handleSubmit: (e: React.FormEvent) => void;
};

const SellingForm: React.FC<SellingFormProps> = ({
                                                     title,
                                                     formData,
                                                     setFormData,
                                                     warehouses,
                                                     students,
                                                     dishes,
                                                     handleChange,
                                                     handleSelectChange,
                                                     handleItemChange,
                                                     handleAddItem,
                                                     handleRemoveItem,
                                                     handleSubmit,
                                                     submitButtonText,
                                                 }) => {
    const router = useRouter();

    // 🛠 Функция добавления блюда в таблицу
    const handleAddDish = (dish: any) => {
        const dishIdStr = dish.id.toString();
        setFormData((prev) => {
            const existingIndex = prev.selling_dish_items.findIndex(
                (item) => String(item.dish) === dishIdStr
            );
            if (existingIndex !== -1) {
                // Если блюдо уже есть – увеличиваем количество на 1 (явное приведение к числу)
                const updatedItems = [...prev.selling_dish_items];
                const currentQuantity = Number(updatedItems[existingIndex].quantity) || 0;
                updatedItems[existingIndex].quantity = currentQuantity + 1;
                return { ...prev, selling_dish_items: updatedItems };
            } else {
                // Если блюда нет – добавляем новую строку с количеством 1
                const newItem: DishItem = {
                    dish: dishIdStr,
                    quantity: 1,
                    sale_price: dish.sale_price || 0,
                    amount: dish.sale_price || 0,
                };
                return { ...prev, selling_dish_items: [...prev.selling_dish_items, newItem] };
            }
        });
    };

    return (
        <div className="flex space-x-6">
            {/* Левая часть - форма */}
            <form onSubmit={handleSubmit} className="space-y-6 w-2/4">
                <h1 className="kez-info-text">{title}</h1>

                {/* Блок 1: Номер, Дата, Принята */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Номер</label>
                        <Input
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            required
                            className="kez-input"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Дата</label>
                        <Input
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="kez-input"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Принята:</label>
                        <Checkbox
                            name="accepted"
                            checked={formData.accepted}
                            onCheckedChange={(checked) =>
                                setFormData((prev) => ({ ...prev, accepted: Boolean(checked) }))
                            }
                            className="kez-input"
                        />
                    </div>
                </div>

                {/* Блок 2: Сумма, Оплаченная сумма */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Сумма</label>
                        <Input
                            type="number"
                            step="0.01"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            className="kez-input"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Оплаченная сумма</label>
                        <Input
                            type="number"
                            step="0.01"
                            name="paid_amount"
                            value={formData.paid_amount}
                            onChange={handleChange}
                            required
                            className="kez-input"
                        />
                    </div>
                </div>

                {/* Блок 3: Учащийся, Склад (с использованием Select) */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Учащийся</label>
                        <Select
                            value={formData.student}
                            onValueChange={(value) => handleSelectChange("student", value)}
                            required
                        >
                            <SelectTrigger className="kez-input">
                                <SelectValue placeholder="Выберите учащегося" />
                            </SelectTrigger>
                            <SelectContent className="kez-select-content">
                                {students.map((st) => (
                                    <SelectItem key={st.id} value={String(st.id)} className="kez-select-item">
                                        {st.full_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Склад</label>
                        <Select
                            value={formData.warehouse}
                            onValueChange={(value) => handleSelectChange("warehouse", value)}
                            required
                        >
                            <SelectTrigger className="kez-input">
                                <SelectValue placeholder="Выберите склад" />
                            </SelectTrigger>
                            <SelectContent className="kez-select-content">
                                {warehouses.map((wh) => (
                                    <SelectItem key={wh.id} value={String(wh.id)} className="kez-select-item">
                                        {wh.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Блок 4: Таблица с блюдами (с использованием Select для выбора блюда) */}
                <h2 className="kez-info-text">Блюда</h2>
                <div className="mb-4 border p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Блюдо</TableHead>
                                <TableHead>Количество</TableHead>
                                <TableHead>Цена</TableHead>
                                <TableHead>Сумма</TableHead>
                                <TableHead>Удалить</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {formData.selling_dish_items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Select
                                            value={String(item.dish)}
                                            onValueChange={(value) => handleItemChange(index, "dish", value)}
                                            required
                                        >
                                            <SelectTrigger className="kez-input">
                                                <SelectValue placeholder="Выберите блюдо" />
                                            </SelectTrigger>
                                            <SelectContent className="kez-select-content">
                                                {dishes.map((dish) => (
                                                    <SelectItem key={dish.id} value={String(dish.id)} className="kez-select-item">
                                                        {dish.name_ru || dish.name_en || dish.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                            required
                                            className="kez-input"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={item.sale_price}
                                            onChange={(e) => handleItemChange(index, "sale_price", e.target.value)}
                                            required
                                            className="kez-input"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={item.amount}
                                            onChange={(e) => handleItemChange(index, "amount", e.target.value)}
                                            required
                                            className="kez-input"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <CircleX size={24} className="text-red-500" onClick={() => handleRemoveItem(index)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button className="kez-simple-btn mt-2" type="button" onClick={handleAddItem}>
                        Добавить блюдо
                    </Button>
                </div>

                {/* Блок 5: Комментарий */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Комментарий</label>
                    <Textarea
                        name="commentary"
                        value={formData.commentary}
                        onChange={handleChange}
                        className="kez-input"
                    />
                </div>

                {/* Кнопка отправки */}
                <div className="pt-1">
                    <Button type="submit" className="kez-submit-btn">
                        {submitButtonText}
                    </Button>
                    <Button className="kez-simple-btn mx-2" type="button" onClick={() => router.push("/operations/selling-dishes")}>
                        Отмена
                    </Button>
                </div>
            </form>

            {/* Правая часть - Подбор блюд */}
            <div className="w-2/4 border border-gray-200 rounded-md p-4 bg-gray-50">
                <h2 className="font-semibold text-lg mb-2">Выберите блюдо:</h2>
                <SelectDish onSelectDish={handleAddDish} />
            </div>
        </div>
    );
};

export default SellingForm;
