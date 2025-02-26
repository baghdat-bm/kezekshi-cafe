'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useContractorStore } from '@/lib/store/contractors';

const ContractorEdit = () => {
    const router = useRouter();
    const params = useParams();
    const contractorId = Number(params.id);

    const { selectedContractor, fetchContractor, updateContractor } = useContractorStore();

    const [form, setForm] = useState({
        id: contractorId,
        name: '',
        bik: '',
        bank: '',
        corr_account: '',
        check_account: '',
    });

    interface Errors {
        name: string;
    }

    const [errors, setErrors] = useState<Errors>({
        name: '',
    });

    useEffect(() => {
        if (contractorId) {
            fetchContractor(contractorId);
        }
    }, [contractorId, fetchContractor]);

    useEffect(() => {
        if (selectedContractor) {
            setForm({
                id: selectedContractor.id,
                name: selectedContractor.name || '',
                bik: selectedContractor.bik || '',
                bank: selectedContractor.bank || '',
                corr_account: selectedContractor.corr_account || '',
                check_account: selectedContractor.check_account || '',
            });
        }
    }, [selectedContractor]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // очищаем ошибку для изменяемого поля
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        let valid = true;
        const newErrors: Errors = {
            name: '',
        };

        if (!form.name.trim()) {
            newErrors.name = 'Это поле обязательно для заполнения';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        await updateContractor(form.id, form);
        router.push('/admin/contractors');
    };

    return (
        <div>
            <h1>Редактирование контрагента</h1>
            <form onSubmit={handleSubmit}>
                {/* Скрытое поле id */}
                <input type="hidden" name="id" value={form.id} />
                {/* Поле name не отображается */}
                <div>
                    <label>Название:</label>
                    <input name="name" value={form.name} onChange={handleChange} />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>
                <div>
                    <label>БИК:</label>
                    <input name="bik" value={form.bik} onChange={handleChange} />
                </div>
                <div>
                    <label>Банк:</label>
                    <input name="bank" value={form.bank} onChange={handleChange} />
                </div>
                <div>
                    <label>Кор.счет:</label>
                    <input name="corr_account" value={form.corr_account} onChange={handleChange} />
                </div>
                <div>
                    <label>Расчетный счет:</label>
                    <input name="check_account" value={form.check_account} onChange={handleChange} />
                </div>
                <button type="submit">Сохранить изменения</button>
                <button type="button" onClick={() => router.push('/admin/contractors')}>
                    Отмена
                </button>
            </form>
        </div>
    );
};

export default ContractorEdit;
