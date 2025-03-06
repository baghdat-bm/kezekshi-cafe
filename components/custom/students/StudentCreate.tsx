'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContractorStore } from '@/lib/store/contractors';

const StudentCreate = () => {
    const [form, setForm] = useState({
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

    const { addContractor } = useContractorStore();
    const router = useRouter();

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
        await addContractor(form);
        router.push('/admin/contractors');
    };

    return (
        <div>
            <h1>Создание контрагента</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Создать</button>
                <button type="button" onClick={() => router.push('/admin/contractors')}>
                    Отмена
                </button>
            </form>
        </div>
    );
};

export default StudentCreate;
