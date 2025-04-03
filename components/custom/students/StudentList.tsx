'use client';

import React, { useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useStudentStore } from '@/lib/store/students';
import Image from "next/image";
import useTranslationStore from "@/lib/store/useTranslationStore";

const StudentList = () => {
    const { students, fetchStudents } = useStudentStore();
    const { t } = useTranslationStore();

    useEffect(() => {
        fetchStudents();
        // console.log(students);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchStudents]);

    return (
        <div>
            <Table>
                <TableCaption className="kez-table-caption">
                    {t("refs.studentsList")}
                </TableCaption>
                <TableHeader>
                    <TableRow className="kez-table-header-row">
                        <TableHead>ID</TableHead>
                        <TableHead>{t("common.nameSurname")}</TableHead>
                        <TableHead>{t("refs.balance")}</TableHead>
                        <TableHead>{t("common.phone")}</TableHead>
                        <TableHead>{t("common.photo")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students.map((item) => (
                        <TableRow key={item.id} className="kez-table-body-row">
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.full_name}</TableCell>
                            <TableCell className="text-right">{item.balance}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>
                                {item.photo && (
                                    <Image
                                        src={item.photo}
                                        alt={item.full_name}
                                        width={50}
                                        height={50}
                                        unoptimized={true}
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default StudentList;
