'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useContractorStore } from '@/lib/store/contractors';
import ContractorDeleteButton from './ContractorDeleteButton';

const ContractorList = () => {
    const { contractors, fetchContractors, deleteContractor } = useContractorStore();

    useEffect(() => {
        fetchContractors();
    }, [fetchContractors]);

    return (
        <div>
            <h1>Список контрагентов</h1>
            <Link href="/admin/contractors/new">Создать нового контрагента</Link>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {contractors.map((contractor) => (
                    <tr key={contractor.id}>
                        <td>{contractor.id}</td>
                        <td>
                            <Link href={`/admin/contractors/${contractor.id}`}>
                                {contractor.name || 'Без названия'}
                            </Link>
                        </td>
                        <td>
                            <ContractorDeleteButton id={contractor.id} onDelete={deleteContractor} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContractorList;
