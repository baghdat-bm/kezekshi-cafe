'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useTranslationStore from "@/lib/store/useTranslationStore";

export interface ContractorFormValues {
    id?: number;
    name: string;
    bik: string;
    bank: string;
    corr_account: string;
    check_account: string;
}

interface ContractorFormProps {
    initialValues?: ContractorFormValues;
    onSubmit: (data: ContractorFormValues) => Promise<void>;
    onCancel: () => void;
    submitText?: string;
}

const ContractorForm: React.FC<ContractorFormProps> = ({
                                                           initialValues,
                                                           onSubmit,
                                                           onCancel,
                                                           submitText = 'Сохранить',
                                                       }) => {
    const [form, setForm] = useState<ContractorFormValues>({
        name: '',
        bik: '',
        bank: '',
        corr_account: '',
        check_account: '',
        ...initialValues,
    });

    interface Errors {
        name: string;
    }

    const [errors, setErrors] = useState<Errors>({ name: '' });

    const { t } = useTranslationStore();

    useEffect(() => {
        if (initialValues) {
            setForm({
                name: initialValues.name || '',
                bik: initialValues.bik || '',
                bank: initialValues.bank || '',
                corr_account: initialValues.corr_account || '',
                check_account: initialValues.check_account || '',
                id: initialValues.id,
            });
        }
    }, [initialValues]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        let valid = true;
        const newErrors: Errors = { name: '' };

        if (!form.name.trim()) {
            newErrors.name = t("common.fieldMustBeFilledIn");
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        await onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Блок 1: Поле для названия */}
            <div className="flex flex-row gap-6">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">{t("common.name")}:</label>
                    <Input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t("common.name")}
                        className="kez-input"
                        required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
            </div>

            {/* Блок 2: Поля для банка и БИК */}
            <div className="flex flex-row gap-6">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">{t("refs.bank")}:</label>
                    <Input
                        type="text"
                        name="bank"
                        value={form.bank}
                        onChange={handleChange}
                        placeholder={t("common.name")}
                        className="kez-input"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">{t("refs.bik")}:</label>
                    <Input
                        type="text"
                        name="bik"
                        value={form.bik}
                        onChange={handleChange}
                        placeholder="БИК"
                        className="kez-input"
                    />
                </div>
            </div>

            {/* Блок 3: Поля для корр. счета и расчетного счета */}
            <div className="flex flex-row gap-6">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">{t("refs.corrAccount")}:</label>
                    <Input
                        type="text"
                        name="corr_account"
                        value={form.corr_account}
                        onChange={handleChange}
                        placeholder="корр. счет"
                        className="kez-input"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">{t("refs.checkAccount")}:</label>
                    <Input
                        type="text"
                        name="check_account"
                        value={form.check_account}
                        onChange={handleChange}
                        placeholder="расчетный счет"
                        className="kez-input"
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <Button type="submit" className="kez-submit-btn">{submitText}</Button>
                <Button variant="outline" type="button" onClick={onCancel} className="kez-simple-btn mx-2">
                    {t("common.cancel")}
                </Button>
            </div>
        </form>
    );
};

export default ContractorForm;
