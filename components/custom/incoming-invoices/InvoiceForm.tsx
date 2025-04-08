'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { CircleX } from "lucide-react";
import {useRouter} from "next/navigation";
import {Contractor} from "@/lib/store/contractors";
import {Warehouse} from "@/lib/store/warehouses";
import {Dish} from "@/lib/store/dishes";
import {MeasurementUnit} from "@/lib/store/measurement-units";
import useTranslationStore from "@/lib/store/useTranslationStore";

export type InvoiceDishItem = {
    dish: string;
    quantity: string;
    measurement_unit: string;
    cost_price: string;
    sale_price: string;
};

export type InvoiceFormData = {
    date: string;
    accepted: boolean;
    warehouse: string;
    supplier: string;
    commentary: string;
    amount: number;
    shipping_cost: number;
    paid_amount: number;
    invoice_dish_items: InvoiceDishItem[];
};

type InvoiceFormProps = {
    title: string;
    submitButtonText: string;
    formData: InvoiceFormData;
    setFormData: React.Dispatch<React.SetStateAction<InvoiceFormData>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSelectChange: (name: string, value: string) => void;
    handleItemChange: (index: number, field: string, value: string) => void;
    handleAddItem: () => void;
    handleRemoveItem: (index: number) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    // Дополнительные данные для селектов
    contractors: Contractor[];
    warehouses: Warehouse[];
    dishes: Dish[];
    units: MeasurementUnit[];
};

const InvoiceForm: React.FC<InvoiceFormProps> = ({
                                                     title,
                                                     submitButtonText,
                                                     formData,
                                                     setFormData,
                                                     handleChange,
                                                     handleSelectChange,
                                                     handleItemChange,
                                                     handleAddItem,
                                                     handleRemoveItem,
                                                     handleSubmit,
                                                     contractors,
                                                     warehouses,
                                                     dishes,
                                                     units,
                                                 }) => {
    const router = useRouter();
    const { language, t } = useTranslationStore();

    return (
        <div>
            <h1 className="kez-info-text">{title}</h1>
            <form onSubmit={handleSubmit} className="mt-2">
                {/* Блок 1: Два ряда по три колонки */}
                <div className="mb-4">
                    {formData.date && (
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label>{t("common.date")}:</label>
                            <Input
                                type="datetime-local"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="kez-input"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1">{t("common.accepted")}:</label>
                            <Checkbox
                                name="accepted"
                                checked={formData.accepted}
                                onCheckedChange={(checked) =>
                                    setFormData(prev => ({ ...prev, accepted: Boolean(checked) }))
                                }
                                className="kez-input"
                            />
                        </div>
                    </div> )}
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                            <label>{t("common.sum")}:</label>
                            <Input
                                type="number"
                                step="0.01"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                className="kez-input"
                                required
                            />
                        </div>
                        <div>
                            <label>{t("incomingInvoice.shippingCost")}:</label>
                            <Input
                                type="number"
                                step="0.01"
                                name="shipping_cost"
                                value={formData.shipping_cost}
                                onChange={handleChange}
                                className="kez-input"
                                required
                            />
                        </div>
                        <div>
                            <label>{t("incomingInvoice.shippingCost")}:</label>
                            <Input
                                type="number"
                                step="0.01"
                                name="paid_amount"
                                value={formData.paid_amount}
                                onChange={handleChange}
                                className="kez-input"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Блок 2: Две колонки для поставщика и склада */}
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label>{t("common.supplier")}:</label>
                        <Select
                            value={formData.supplier}
                            onValueChange={(value) => handleSelectChange('supplier', value)}
                            required
                        >
                            <SelectTrigger className="kez-input">
                                <SelectValue placeholder="Выберите поставщика" />
                            </SelectTrigger>
                            <SelectContent className="kez-select-content">
                                {contractors.map(ct => (
                                    <SelectItem key={ct.id} value={String(ct.id)} className="kez-select-item">
                                        {ct.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label>{t("common.warehouse")}:</label>
                        <Select
                            value={formData.warehouse}
                            onValueChange={(value) => handleSelectChange('warehouse', value)}
                            required
                        >
                            <SelectTrigger className="kez-input">
                                <SelectValue placeholder="Выберите склад" />
                            </SelectTrigger>
                            <SelectContent className="kez-select-content">
                                {warehouses.map(wh => (
                                    <SelectItem key={wh.id} value={String(wh.id)} className="kez-select-item">
                                        {wh.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Блок 3: Область с таблицей блюд (визуально выделена) */}
                <h2 className="kez-info-text">{t("common.dishes")}</h2>
                <div className="mb-4 border p-4">

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t("common.dish")}</TableHead>
                                <TableHead>{t("common.quantity")}</TableHead>
                                <TableHead>{t("common.units")}</TableHead>
                                <TableHead>{t("common.costPrice")}</TableHead>
                                <TableHead>{t("common.salePrice")}</TableHead>
                                <TableHead>{t("common.delete")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {formData.invoice_dish_items.map((item, index) => (
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
                                                {dishes.map(dish => (
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
                                            className="kez-input"
                                            required
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={String(item.measurement_unit)}
                                            onValueChange={(value) => handleItemChange(index, 'measurement_unit', value)}
                                            required
                                        >
                                            <SelectTrigger className="kez-input">
                                                <SelectValue placeholder="Выберите единицу измерения" />
                                            </SelectTrigger>
                                            <SelectContent className="kez-select-content">
                                                {units.map(unit => (
                                                    <SelectItem key={unit.id} value={String(unit.id)} className="kez-select-item">
                                                        {unit[`name_${language}`]}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={item.cost_price}
                                            onChange={(e) => handleItemChange(index, 'cost_price', e.target.value)}
                                            className="kez-input"
                                            required
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={item.sale_price}
                                            onChange={(e) => handleItemChange(index, 'sale_price', e.target.value)}
                                            className="kez-input"
                                            required
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

                {/* Блок 4: Поле комментария */}
                <div className="mb-4">
                    <label>{t("common.comments")}:</label>
                    <Textarea
                        name="commentary"
                        value={formData.commentary}
                        onChange={handleChange}
                        className="kez-input"
                    />
                </div>

                {/* Блок 5: Кнопка сохранения (визуально выделена) */}
                <div className="pt-1">
                    <Button type="submit" className="kez-submit-btn">
                        {submitButtonText}
                    </Button>
                    <Button className="kez-simple-btn mx-2" type="button" onClick={() => router.push('/operations/incoming-invoices')}>
                        {t("common.cancel")}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default InvoiceForm;
