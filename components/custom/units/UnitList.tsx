'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useMeasurementUnitStore } from '@/lib/store/measurement-units';
import UnitDeleteButton from './UnitDeleteButton';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import useTranslationStore from "@/lib/store/useTranslationStore";

const UnitList = () => {
    const { units, fetchUnits, deleteUnit } = useMeasurementUnitStore();
    const { language, t } = useTranslationStore();

    useEffect(() => {
        fetchUnits();
    }, [fetchUnits]);

    return (
        <div>
            <Link href="/admin/units/new" className="kez-create-item-btn">
                {t("refs.createNewUnit")}
            </Link>

            <Table>
                <TableCaption className="kez-table-caption">
                    {t("refs.unitsList")}
                </TableCaption>
                <TableHeader>
                    <TableRow className="kez-table-header-row">
                        <TableHead>ID</TableHead>
                        <TableHead>{t("common.name")}</TableHead>
                        <TableHead>{t("common.delete")}</TableHead>
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
                                    {item[`name_${language}`] || t("common.noName")}
                                </Link>
                            </TableCell>
                            <TableCell className="text-center">
                                <UnitDeleteButton id={item.id} onDelete={deleteUnit}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UnitList;
