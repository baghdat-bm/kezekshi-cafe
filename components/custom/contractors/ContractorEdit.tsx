'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useContractorStore } from '@/lib/store/contractors';
import ContractorForm, { ContractorFormValues } from './ContractorForm';
import useTranslationStore from "@/lib/store/useTranslationStore";

const ContractorEdit = () => {
    const router = useRouter();
    const params = useParams();
    const contractorId = Number(params.id);

    const { selectedContractor, fetchContractor, updateContractor } = useContractorStore();
    const { t } = useTranslationStore();

    useEffect(() => {
        if (contractorId) {
            fetchContractor(contractorId);
        }
    }, [contractorId, fetchContractor]);

    const handleSubmit = async (data: ContractorFormValues) => {
        await updateContractor(contractorId, data);
        router.push('/admin/contractors');
    };

    const handleCancel = () => {
        router.push('/admin/contractors');
    };

    if (!selectedContractor) {
        return <div>{t("home.loading")}</div>;
    }

    const initialValues: ContractorFormValues = {
        id: selectedContractor.id,
        name: selectedContractor.name || '',
        bik: selectedContractor.bik || '',
        bank: selectedContractor.bank || '',
        corr_account: selectedContractor.corr_account || '',
        check_account: selectedContractor.check_account || '',
    };

    return (
        <div>
            <h1>{t("refs.editContractor")}</h1>
            <ContractorForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitText={t("common.save")}
            />
        </div>
    );
};

export default ContractorEdit;
