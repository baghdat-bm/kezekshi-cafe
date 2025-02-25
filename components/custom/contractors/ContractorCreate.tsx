'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContractorStore } from '@/lib/store/contractors';

const ContractorCreate = () => {
    const [form, setForm] = useState({
        name: '',
        bik: '',
        bank: '',
        corr_account: '',
        check_account: '',
    });

    const { addContractor } = useContractorStore();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                </div>
                <div>
                    <label>БИК:</label>
                    <input name="bik" value={form.bik} onChange={handleChange} />
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

export default ContractorCreate;
