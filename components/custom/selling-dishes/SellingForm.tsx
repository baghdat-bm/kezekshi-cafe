"use client";

import React, { useRef } from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Textarea} from "@/components/ui/textarea";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import SelectDish from "@/components/custom/dishes/SelectDish";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import { CircleX, CirclePlus } from "lucide-react";
import {useRouter} from "next/navigation";
import {Dish, useDishStore} from "@/lib/store/dishes";

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
    dishes: Dish[];
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
    // const dishLockRef = useRef(new Set<string>());
    const lastDishRef = useRef<{ dishId: string; time: number }>({ dishId: "", time: 0 });

    // 🛠 Функция добавления блюда в таблицу
    const handleAddDish = (dish: Dish) => {
        const dishIdStr = dish.id.toString();
        // const now = Date.now();
        // // Если тот же dish добавляется повторно слишком быстро – пропускаем обновление
        // if (lastDishRef.current.dishId === dishIdStr && now - lastDishRef.current.time < 100) {
        //     console.log("Duplicate call ignored for dish:", dishIdStr);
        //     return;
        // }
        // lastDishRef.current = { dishId: dishIdStr, time: now };

        setFormData((prev) => {
            const existingIndex = prev.selling_dish_items.findIndex(
                (item) => String(item.dish) === dishIdStr
            );
            if (existingIndex !== -1) {
                const updatedItems = [...prev.selling_dish_items];
                // Приводим значение к числу, заменяя возможную запятую на точку
                const currentQuantity = parseFloat(
                    String(updatedItems[existingIndex].quantity).replace(",", ".")
                ) || 0;
                updatedItems[existingIndex].quantity = currentQuantity + 1;
                return { ...prev, selling_dish_items: updatedItems };
            } else {
                const newItem: DishItem = {
                    dish: dishIdStr,
                    quantity: 1,
                    sale_price: 0,
                    amount: 0,
                };
                return { ...prev, selling_dish_items: [...prev.selling_dish_items, newItem] };
            }
        });

        // Обновляем остаток блюда в локальном хранилище, уменьшая его на 1
        // if (dish.remaining_quantity !== null && dish.remaining_quantity > 0) {
        if (dish.remaining_quantity !== null) {
            useDishStore.setState((state) => ({
                dishesExt: state.dishesExt.map((item) =>
                    item.id === dish.id
                        ? { ...item, remaining_quantity: (item.remaining_quantity && item.remaining_quantity - 1) ? item.remaining_quantity : 0  }
                        : item
                ),
            }));
        } else {
            console.warn("Остаток блюда равен нулю или не задан для блюда с id:", dish.id);
        }
    };


    return (
        <div className="flex space-x-6">
            {/* Левая часть - форма */}
            <form onSubmit={handleSubmit} className="space-y-6 w-2/5">
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
                                setFormData((prev) => ({...prev, accepted: Boolean(checked)}))
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
                                <SelectValue placeholder="Выберите учащегося"/>
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
                                <SelectValue placeholder="Выберите склад"/>
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

                <Table>
                    <TableHeader className="border border-gray-300">
                        <TableRow className="border border-gray-300 text-gray-500">
                            <TableHead className="p-3 font-bold px-10">Блюдо</TableHead>
                            <TableHead className="p-3 font-bold">Кол-во</TableHead>
                            <TableHead className="p-3 font-bold">Цена</TableHead>
                            <TableHead className="p-3 font-bold">Сумма</TableHead>
                            <TableHead className="p-3 font-bold"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="border border-gray-300">
                        {formData.selling_dish_items.map((item, index) => (
                            <TableRow key={index} className="border border-gray-300">
                                <TableCell className="py-0">
                                    <Select
                                        value={String(item.dish)}
                                        onValueChange={(value) => handleItemChange(index, "dish", value)}
                                        required
                                    >
                                        <SelectTrigger className="kez-table-cell">
                                            <SelectValue placeholder="Выберите блюдо"/>
                                        </SelectTrigger>
                                        <SelectContent className="kez-select-content">
                                            {dishes.map((dish) => (
                                                <SelectItem key={dish.id} value={String(dish.id)}
                                                            className="kez-select-item">
                                                    {dish.name_ru || dish.name_en || dish.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="py-0">
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                        required
                                        className="kez-table-cell"
                                    />
                                </TableCell>
                                <TableCell className="py-0">
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={item.sale_price}
                                        onChange={(e) => handleItemChange(index, "sale_price", e.target.value)}
                                        required
                                        className="kez-table-cell"
                                    />
                                </TableCell>
                                <TableCell className="py-0">
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={item.amount}
                                        onChange={(e) => handleItemChange(index, "amount", e.target.value)}
                                        required
                                        className="kez-table-cell"
                                    />
                                </TableCell>
                                <TableCell className="py-0">
                                    <CircleX size={20} className="text-red-500"
                                             onClick={() => handleRemoveItem(index)}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button className="kez-simple-btn" type="button" onClick={handleAddItem}>
                    <CirclePlus className="text-green-600"/> Добавить блюдо
                </Button>


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
                    <Button className="kez-simple-btn mx-2" type="button"
                            onClick={() => router.push("/operations/selling-dishes")}>
                        Отмена
                    </Button>
                </div>
            </form>

            {/* Правая часть - Подбор блюд */}
            <div className="w-3/5 border border-gray-200 rounded-md p-4 bg-gray-50">
                <h2 className="font-semibold text-lg mb-2">Выберите блюдо:</h2>
                <SelectDish onSelectDish={handleAddDish}/>
            </div>
        </div>
    );
};

export default SellingForm;
