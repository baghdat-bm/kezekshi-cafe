'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {Dish} from "@/lib/store/dishes";
import useTranslationStore from "@/lib/store/useTranslationStore";

export type MovementDishesFormData = {
    date: string;
    accepted: boolean;
    warehouse_from: string;
    warehouse_to: string;
    commentary: string;
    movement_dish_items: Array<{
        dish: string;
        quantity: string;
    }>;
};

type MovementDishesFormProps = {
    title: string;
    submitButtonText: string;
    formData: MovementDishesFormData;
    setFormData: React.Dispatch<React.SetStateAction<MovementDishesFormData>>;
    warehouses: Array<{ id: number; name: string }>;
    dishes: Dish[];
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSelectChange: (name: string, value: string) => void;
    handleItemChange: (index: number, field: string, value: string) => void;
    handleAddItem: () => void;
    handleRemoveItem: (index: number) => void;
    handleSubmit: (e: React.FormEvent) => void;
};

const MovementDishesForm: React.FC<MovementDishesFormProps> = ({
                                                                   title,
                                                                   submitButtonText,
                                                                   formData,
                                                                   setFormData,
                                                                   warehouses,
                                                                   dishes,
                                                                   handleChange,
                                                                   handleSelectChange,
                                                                   handleItemChange,
                                                                   handleAddItem,
                                                                   handleRemoveItem,
                                                                   handleSubmit,
                                                               }) => {
    const router = useRouter();
    const { language, t } = useTranslationStore();

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Блок 1: Номер, Дата, Принята */}
            <div>
                <h1 className="kez-info-text">{title}</h1>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t("common.date")}</label>
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
                    <label className="mb-1">{t("common.accepted")}:</label>
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

            {/* Блок 2: Склад отправитель, Склад получатель */}
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t("movement.warehouseSender")}</label>
                    <Select
                        value={formData.warehouse_from}
                        onValueChange={(value) => handleSelectChange('warehouse_from', value)}
                        required
                    >
                        <SelectTrigger className="kez-input">
                            <SelectValue placeholder="Выберите склад отправитель" />
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
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t("movement.warehouseRecipient")}</label>
                    <Select
                        value={formData.warehouse_to}
                        onValueChange={(value) => handleSelectChange('warehouse_to', value)}
                        required
                    >
                        <SelectTrigger className="kez-input">
                            <SelectValue placeholder="Выберите склад получатель" />
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

            {/* Блок 3: Таблица для movement_dish_items */}
            <h2 className="kez-info-text">{t("common.dishes")}</h2>
            <div className="mb-4 border p-4">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t("common.dish")}</TableHead>
                            <TableHead>{t("common.quantity")}</TableHead>
                            <TableHead>{t("common.actions")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {formData.movement_dish_items.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Select
                                        value={String(item.dish)}
                                        onValueChange={(value) => handleItemChange(index, 'dish', value)}
                                        required
                                    >
                                        <SelectTrigger className="kez-input">
                                            <SelectValue placeholder="Выберите блюдо" />
                                        </SelectTrigger>
                                        <SelectContent className="kez-select-content">
                                            {dishes.map((dish) => (
                                                <SelectItem key={dish.id} value={String(dish.id)} className="kez-select-item">
                                                    {dish[`name_${language}`]}
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
                                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
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
                    {t("common.addDish")}
                </Button>
            </div>

            {/* Блок 4: Комментарий */}
            <div>
                <label className="block text-sm font-medium text-gray-700">{t("common.comments")}</label>
                <Textarea
                    name="commentary"
                    value={formData.commentary}
                    onChange={handleChange}
                    className="kez-input"
                />
            </div>

            {/* Кнопки отправки и отмены */}
            <div className="pt-1">
                <Button type="submit" className="kez-submit-btn">{submitButtonText}</Button>
                <Button className="kez-simple-btn mx-2" type="button" onClick={() => router.push('/operations/movement-dishes')}>
                    {t("common.cancel")}
                </Button>
            </div>
        </form>
    );
};

export default MovementDishesForm;
