'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useContractorStore } from '@/lib/store/contractors';
import ContractorDeleteButton from './ContractorDeleteButton';
import useTranslationStore from "@/lib/store/useTranslationStore";

const ContractorList = () => {
    const { contractors, fetchContractors, deleteContractor } = useContractorStore();
    const { t } = useTranslationStore();

    useEffect(() => {
        fetchContractors();
    }, [fetchContractors]);

    return (
        <div>
            <Link href="/admin/contractors/new" className="kez-create-item-btn">
                {t("refs.createNewContractor")}
            </Link>

            <Table>
                <TableCaption className="kez-table-caption">
                    {t("refs.contractorsList")}
                </TableCaption>
                <TableHeader>
                    <TableRow className="kez-table-header-row">
                        <TableHead>ID</TableHead>
                        <TableHead>{t("common.name")}</TableHead>
                        <TableHead>{t("common.delete")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contractors.map((item) => (
                        <TableRow key={item.id} className="kez-table-body-row">
                            <TableCell className="font-medium">
                                <Link href={`/admin/contractors/${item.id}`}>
                                    {item.id}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/admin/contractors/${item.id}`}>
                                    {item.name || t("common.noName")}
                                </Link>
                            </TableCell>
                            <TableCell className="text-center">
                                <ContractorDeleteButton id={item.id} onDelete={deleteContractor} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ContractorList;
