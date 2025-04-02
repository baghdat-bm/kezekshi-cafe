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

export type WriteOffFormData = {
    date: string;
    accepted: boolean;
    warehouse: string;
    writing_off_reason: string;
    commentary: string;
    write_off_dish_items: Array<{
        dish: string;
        quantity: string;
    }>;
};

type WriteOffFormProps = {
    title: string;
    submitButtonText: string;
    formData: WriteOffFormData;
    setFormData: React.Dispatch<React.SetStateAction<WriteOffFormData>>;
    warehouses: Array<{ id: number; name: string }>;
    writingOffReasons: Array<{ id: number; name: string }>;
    dishes: Dish[];
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSelectChange: (name: string, value: string) => void;
    handleItemChange: (index: number, field: string, value: string) => void;
    handleAddItem: () => void;
    handleRemoveItem: (index: number) => void;
    handleSubmit: (e: React.FormEvent) => void;
};

const WriteOffFromWarehouseForm: React.FC<WriteOffFormProps> = ({
                                                                    title,
                                                                    submitButtonText,
                                                                    formData,
                                                                    setFormData,
                                                                    warehouses,
                                                                    writingOffReasons,
                                                                    dishes,
                                                                    handleChange,
                                                                    handleSelectChange,
                                                                    handleItemChange,
                                                                    handleAddItem,
                                                                    handleRemoveItem,
                                                                    handleSubmit,
                                                                }) => {
    const router = useRouter();

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Блок 1: Номер, Дата, Принята */}
            <div>
                <h1 className="kez-info-text">{title}</h1>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
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
                            setFormData(prev => ({ ...prev, accepted: Boolean(checked) }))
                        }
                        className="kez-input"
                    />
                </div>
            </div>

            {/* Блок 2: Склад, Причина списания (Select) */}
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Склад</label>
                    <Select
                        value={formData.warehouse}
                        onValueChange={(value) => handleSelectChange('warehouse', value)}
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
                <div>
                    <label className="block text-sm font-medium text-gray-700">Причина списания</label>
                    <Select
                        value={formData.writing_off_reason}
                        onValueChange={(value) => handleSelectChange('writing_off_reason', value)}
                        required
                    >
                        <SelectTrigger className="kez-input">
                            <SelectValue placeholder="Выберите причину" />
                        </SelectTrigger>
                        <SelectContent className="kez-select-content">
                            {writingOffReasons.map((reason) => (
                                <SelectItem key={reason.id} value={String(reason.id)} className="kez-select-item">
                                    {reason.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Блок 3: Таблица для позиций списания */}
            <h2 className="kez-info-text">Блюда</h2>
            <div className="mb-4 border p-4">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Блюдо</TableHead>
                            <TableHead>Количество</TableHead>
                            <TableHead>Удалить</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {formData.write_off_dish_items.map((item, index) => (
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
                    Добавить блюдо
                </Button>
            </div>

            {/* Блок 4: Комментарий */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Комментарий</label>
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
                <Button className="kez-simple-btn mx-2" type="button" onClick={() => router.push('/operations/write-offs')}>
                    Отмена
                </Button>
            </div>
        </form>
    );
};

export default WriteOffFromWarehouseForm;
