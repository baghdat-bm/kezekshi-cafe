'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useContractorStore } from '@/lib/store/contractors';
import ContractorForm, { ContractorFormValues } from './ContractorForm';
import useTranslationStore from "@/lib/store/useTranslationStore";
import {useGlobalStore} from "@/lib/store/globalStore";

const ContractorCreate = () => {
    const router = useRouter();
    const { addContractor } = useContractorStore();
    const { t } = useTranslationStore();
    const { setLoading } = useGlobalStore();

    const handleSubmit = async (data: ContractorFormValues) => {
        setLoading(true);
        try {
            await addContractor(data);
            router.push('/admin/contractors');
        } catch (error) {
            console.error("Ошибка в addContractor:", error);
            // Можно добавить уведомление об ошибке
        } finally {
            setLoading(false);
        }
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
