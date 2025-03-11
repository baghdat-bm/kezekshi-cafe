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

const StudentList = () => {
    const { students, fetchStudents } = useStudentStore();

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    return (
        <div>
            <Table>
                <TableCaption className="kez-table-caption">
                    Список учащихся
                </TableCaption>
                <TableHeader>
                    <TableRow className="kez-table-header-row">
                        <TableHead>ID</TableHead>
                        <TableHead>ФИО</TableHead>
                        <TableHead>Баланс</TableHead>
                        <TableHead>Телефон</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students.map((item) => (
                        <TableRow key={item.id} className="kez-table-body-row">
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.full_name}</TableCell>
                            <TableCell className="text-right">{item.balance}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default StudentList;
