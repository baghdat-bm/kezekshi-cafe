'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useContractorStore } from '@/lib/store/contractors';
import ContractorForm, { ContractorFormValues } from './ContractorForm';

const ContractorCreate = () => {
    const router = useRouter();
    const { addContractor } = useContractorStore();

    const handleSubmit = async (data: ContractorFormValues) => {
        await addContractor(data);
        router.push('/admin/contractors');
    };

    const handleCancel = () => {
        router.push('/admin/contractors');
    };

    return (
        <div>
            <h1>Создание поставщика</h1>
            <ContractorForm onSubmit={handleSubmit} onCancel={handleCancel} submitText="Создать" />
        </div>
    );
};

export default ContractorCreate;
