'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';
import UnitDeleteButton from './UnitDeleteButton';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const UnitList = () => {
    const { units, fetchUnits, deleteUnit } = useMeasurementUnitStore();

    useEffect(() => {
        fetchUnits();
    }, [fetchUnits]);

    return (
        <div>
            <Link href="/admin/units/new" className="kez-create-item-btn">
                Создать новую единицу измерения
            </Link>

            <Table>
                <TableCaption className="kez-table-caption">
                    Список единиц измерения
                </TableCaption>
                <TableHeader>
                    <TableRow className="kez-table-header-row">
                        <TableHead>ID</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Удалить</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {units.map((item) => (
                        <TableRow key={item.id} className="kez-table-body-row">
                            <TableCell className="font-medium">
                                <Link href={`/admin/units/${item.id}`}>
                                    {item.id}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/admin/units/${item.id}`}>
                                    {item.name || 'Без названия'}
                                </Link>
                            </TableCell>
                            <TableCell className="text-center">
                                <UnitDeleteButton id={item.id} onDelete={deleteUnit} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UnitList;
