'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useContractorStore } from '@/lib/store/contractors';
import ContractorForm, { ContractorFormValues } from './ContractorForm';
import useTranslationStore from "@/lib/store/useTranslationStore";

const ContractorCreate = () => {
    const router = useRouter();
    const { addContractor } = useContractorStore();
    const { t } = useTranslationStore();

    const handleSubmit = async (data: ContractorFormValues) => {
        await addContractor(data);
        router.push('/admin/contractors');
    };

    const handleCancel = () => {
        router.push('/admin/contractors');
    };

    return (
        <div>
            <h1>{t("refs.createNewContractor")}</h1>
            <ContractorForm onSubmit={handleSubmit} onCancel={handleCancel} submitText={t("common.create")} />
        </div>
    );
};

export default ContractorCreate;
