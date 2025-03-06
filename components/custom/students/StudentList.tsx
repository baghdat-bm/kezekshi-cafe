'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useStudentStore } from '@/lib/store/students';
import StudentDeleteButton from './StudentDeleteButton';

const StudentList = () => {
    const { students, fetchStudents, deleteStudent } = useStudentStore();

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    return (
        <div>
            <h1>Список учащихся</h1>
            <Link href="/admin/students/new">Создать нового учащегося</Link>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student) => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>
                            <Link href={`/admin/students/${student.id}`}>
                                {student.full_name || 'Без ФИО'}
                            </Link>
                        </td>
                        <td>
                            <StudentDeleteButton id={student.id} onDelete={deleteStudent} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
